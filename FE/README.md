## 🛠️ 개발 환경 설정

### 1. Node.js 버전 설정

프로젝트에서는 **Node.js v20.15.0**을 사용하고 있습니다. Node.js 버전을 맞추기
위해 다음 명령어를 사용하세요:

.nvmrc 파일을 기준으로 Node.js 설치

```bash
nvm install
```

Node.js 버전 사용

```bash
nvm use
```

Node.js 버전 확인 (팀장 node.js 버전은 20.15.0 )

```bash
node -v
```

Node.js에 맞는 npm 버전 확인 (팀장 npm 버전은 10.7.0 )

```bash
npm -v
```

개발 서버 실행

```bash
npm run dev
```

---

## 🔄 브랜치, Commit, PR, 협업 전략

1. 브랜치 규칙 `main`,`develop` 브랜치는 보호된 브랜치입니다. 직접 푸시할 수
   없으며, 모든 변경 사항은 **Pull Request (PR)**를 통해 병합해야 합니다. 새로운
   기능 또는 버그 수정 시, 별도의 브랜치를 생성하여 작업해야 하니 생성 전
   팀장한테 브랜치 생성을 요청한 뒤에 작업해주세요. 브랜치 이름 예시:
   feature/기능-이름, fix/버그-수정

2. Pull Request 작성 가이드 새로운 브랜치에서 작업 후, `develop` 브랜치로 PR을
   생성합니다. PR 제목 및 설명을 명확하게 작성하고, 필요한 경우 관련된 이슈
   번호를 참조하세요. PR 생성 후 팀장의 리뷰 및 승인을 받아야 합니다. 리뷰어가
   변경 요청을 할 경우, 피드백을 반영한 후 다시 커밋하고, 리뷰어의 승인을 받아야
   합니다.

3. **커밋 메시지 작성 규칙**:

- 커밋 메시지 앞에 **이슈 번호**를 포함하고, 태그(`feat`, `fix`, `docs` 등)를
  사용해 변경 사항을 명확히 표현하세요.
- 예시:
  - `#1 feat: 새로운 기능 추가`
  - `#2 fix: 버그 수정`
  - `#3 docs: README 수정`
- **각 커밋 메시지 앞에 이슈 번호를 표기**한 후 커밋하세요:

  ```bash
  git commit -m "#42 feat: 로그인 기능 추가"

  ```

#### Git Convention

1.적절한 커밋 접두사 작성 <br/> 2.커밋 메시지 내용 작성 <br/> 3.내용 뒤에 이슈
(#이슈 번호)와 같이 작성하여 이슈 연결 <br/> | 접두사 | 설명 |
|------------|----------------------------| | `Feat` | 새로운 기능 구현 | |
`Add` | 에셋 파일 추가 | | `Fix` | 버그 수정 | | `Docs` | 문서 추가 및 수정 | |
`Style` | 스타일링 작업 | | `Refactor` | 코드 리팩토링 (동작 변경 없음) | |
`Test` | 테스트 | | `Deploy` | 배포 | | `Conf` | 빌드, 환경 설정 | | `Chore` |
기타 작업 |

---

#### Pull Request

##### Title

- 제목은 `[Feat] 홈 페이지 구현`과 같이 작성합니다.

##### PR Type

- [ ] `FEAT`: 새로운 기능 구현
- [ ] `ADD`: 에셋 파일 추가
- [ ] `FIX`: 버그 수정
- [ ] `DOCS`: 문서 추가 및 수정
- [ ] `STYLE`: 포맷팅 변경
- [ ] `REFACTOR`: 코드 리팩토링
- [ ] `TEST`: 테스트 관련
- [ ] `DEPLOY`: 배포 관련
- [ ] `CONF`: 빌드, 환경 설정
- [ ] `CHORE`: 기타 작업

#### Code Convention

# <<<<<<< HEAD

- [ ] FE
  - 코드 스타일 유지를 위해 **ESLint와 Prettier**가 설정되어 있습니다.
  - styled-Component 각 단어 첫번째 글짜 대문자로 나머진 소문자
  - styled-Component는 return문 위에 작성
  - export방식 권장 (ex. export default ~)

---

## 👥 팀원 가이드

1. 팀원들이 해야 할 일 =>  
   git clone 후, npm install 명령어를 실행하여 모든 의존성을 설치합니다.  
   새로운 기능 개발 시 Pull Request를 생성하고, 팀장의 승인을 요청합니다.  
   코드 리뷰 프로세스를 통해 협업을 진행하며, 모든 피드백을 반영하여 PR을
   업데이트합니다.

2. 팀장이 해야 할 일 => 코드 리뷰 및 PR 승인을 담당합니다.  
   긴급 상황에서만 Bypass 권한을 사용하여 직접 병합합니다.

---

## 📂 폴더 구조

assets : 이미지 파일 집합 <br/> components : 재사용 가능한 컴포넌트 집합 <br/>
pages : 유저가 보는 실제 콘텐츠 <br/> style : 공통 스타일드 컴포넌트, reset.css,
프로젝트 컬러 상수화, 폰트 <br/>

📦Pet-Mate <br/> ├─📂public <br/> │ ├─📂assets <br/> └─📂src <br/>
├─📂components <br/> │ ├─📂Button <br/> │ ├─📂ui <br/> │ ├─📂Footer <br/> │
├─📂Header <br/> │ ├─📂Navbar <br/> ├─📂pages <br/> │ ├─📂JoinPage <br/> │
├─📂LoginPage <br/> │ ├─📂MainPage <br/> │ ├─📂NoticePage <br/> │ ├─. │ ├─. │
├─. └─📂App.jsx <br/> └─📂main.jsx <br/> └─📂fonts <br/>
