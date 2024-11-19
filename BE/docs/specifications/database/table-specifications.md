## Users Table
**Description**: 사용자 정보를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 사용자 고유 식별자 |
| email | VARCHAR(255) | UNIQUE, NOT NULL | 사용자 이메일 |
| password_hash | VARCHAR(255) | NOT NULL | 암호화된 비밀번호 |
| nickname | VARCHAR(20) | UNIQUE, NOT NULL | 사용자 닉네임 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 계정 생성 시간 |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 정보 수정 시간 |
| last_login | TIMESTAMP WITH TIME ZONE | | 마지막 로그인 시간 |
| is_active | BOOLEAN | DEFAULT TRUE | 계정 활성화 상태 |
| social_provider | VARCHAR(20) | | 소셜 로그인 제공자 |
| social_id | VARCHAR(255) | | 소셜 로그인 ID |

**Indexes**:
- idx_users_email ON (email)
- idx_users_nickname ON (nickname)

## User_Locations Table
**Description**: 사용자의 위치 정보를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 위치 정보 고유 식별자 |
| user_id | INTEGER | REFERENCES users(id) | 사용자 ID |
| district | VARCHAR(50) | NOT NULL | 구 |
| neighborhood | VARCHAR(50) | NOT NULL | 동 |
| is_primary | BOOLEAN | DEFAULT TRUE | 주 위치 여부 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 생성 시간 |

**Unique Constraint**: (user_id, district, neighborhood)

## Pets Table
**Description**: 반려동물 정보를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 반려동물 고유 식별자 |
| user_id | INTEGER | REFERENCES users(id) | 소유자 ID |
| name | VARCHAR(50) | NOT NULL | 반려동물 이름 |
| breed | VARCHAR(100) | NOT NULL | 품종 |
| age | INTEGER | | 나이 |
| weight | DECIMAL(4,1) | | 체중 |
| description | TEXT | | 설명 |
| image_url | VARCHAR(255) | | 사진 URL |
| size_category | VARCHAR(20) | | 크기 분류 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 등록 시간 |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 수정 시간 |

## Posts Table
**Description**: 게시글 정보를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 게시글 고유 식별자 |
| user_id | INTEGER | REFERENCES users(id) | 작성자 ID |
| category | VARCHAR(50) | NOT NULL | 게시글 카테고리 |
| title | VARCHAR(255) | NOT NULL | 제목 |
| content | TEXT | NOT NULL | 내용 |
| district | VARCHAR(50) | NOT NULL | 구 |
| neighborhood | VARCHAR(50) | NOT NULL | 동 |
| view_count | INTEGER | DEFAULT 0 | 조회수 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 작성 시간 |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 수정 시간 |
| is_deleted | BOOLEAN | DEFAULT FALSE | 삭제 여부 |

**Indexes**:
- idx_posts_category ON (category)
- idx_posts_location ON (district, neighborhood)

## Post_Images Table
**Description**: 게시글 이미지를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 이미지 고유 식별자 |
| post_id | INTEGER | REFERENCES posts(id) | 게시글 ID |
| image_url | VARCHAR(255) | NOT NULL | 이미지 URL |
| order_num | INTEGER | NOT NULL | 이미지 순서 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 등록 시간 |

## Comments Table
**Description**: 댓글 정보를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 댓글 고유 식별자 |
| post_id | INTEGER | REFERENCES posts(id) | 게시글 ID |
| user_id | INTEGER | REFERENCES users(id) | 작성자 ID |
| parent_id | INTEGER | REFERENCES comments(id) | 부모 댓글 ID |
| content | TEXT | NOT NULL | 댓글 내용 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 작성 시간 |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 수정 시간 |
| is_deleted | BOOLEAN | DEFAULT FALSE | 삭제 여부 |

**Index**: idx_comments_post_id ON (post_id)

## Likes Table
**Description**: 게시글 좋아요 정보를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 좋아요 고유 식별자 |
| user_id | INTEGER | REFERENCES users(id) | 사용자 ID |
| post_id | INTEGER | REFERENCES posts(id) | 게시글 ID |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 생성 시간 |

**Unique Constraint**: (user_id, post_id)

## Messages Table
**Description**: 사용자 간 메시지를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 메시지 고유 식별자 |
| sender_id | INTEGER | REFERENCES users(id) | 발신자 ID |
| receiver_id | INTEGER | REFERENCES users(id) | 수신자 ID |
| content | TEXT | NOT NULL | 메시지 내용 |
| is_read | BOOLEAN | DEFAULT FALSE | 읽음 여부 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 전송 시간 |

**Indexes**:
- idx_messages_sender ON (sender_id)
- idx_messages_receiver ON (receiver_id)

## Friendships Table
**Description**: 사용자 간 친구 관계를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 친구 관계 고유 식별자 |
| requester_id | INTEGER | REFERENCES users(id) | 요청자 ID |
| addressee_id | INTEGER | REFERENCES users(id) | 수신자 ID |
| status | VARCHAR(20) | NOT NULL | 친구 상태 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 생성 시간 |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 수정 시간 |

**Unique Constraint**: (requester_id, addressee_id)

## Notifications Table
**Description**: 알림 정보를 저장하는 테이블

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 알림 고유 식별자 |
| user_id | INTEGER | REFERENCES users(id) | 수신자 ID |
| type | VARCHAR(50) | NOT NULL | 알림 유형 |
| content | TEXT | NOT NULL | 알림 내용 |
| reference_id | INTEGER | | 참조 ID |
| is_read | BOOLEAN | DEFAULT FALSE | 읽음 여부 |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | 생성 시간 |

**Index**: idx_notifications_user ON (user_id, is_read)