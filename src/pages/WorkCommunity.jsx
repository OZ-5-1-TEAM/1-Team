import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import debounce from 'lodash.debounce';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import FilterComponent from '../components/FilterComponent';
import axios from 'axios';

const MainPageWrapper = styled.div`
  padding-top: 130px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding-bottom: 63px;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff8e1;
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 425px) {
    padding: 10px 10px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 30px;
  padding: 0 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 15px;

  &:focus {
    outline: none;
    border: 2px solid #ffa000;
  }
`;

const CancelButton = styled(Button)`
  height: 30px;
  padding: 0 15px;
  background-color: #ffa000;
  font-size: 15px;
  margin-right: 1rem !important;
`;

const FilterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterContainerWrapper = styled.div`
  position: relative;
  height: 0;
`;

const WriteButton = styled(Button)`
  font-size: 15px;
  width: 75px;
  height: 30px;
  background-color: #ffa000;
  color: white;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

const PostListContainer = styled.div`
  margin: 30px 0;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;
  gap: 15px;

  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const PostImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  background-color: #f0f0f0;
  background-image: url('/placeholder-image.jpg');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const PostContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative; /* 부모 요소에서 relative로 설정 */
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const PostTitle = styled.h4`
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: bold;
  margin: 20px 0 0px 10px;
`;

const PostNinknameAndSize = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px 0 5px 10px;
  font-size: 13px;
  font-weight: bold;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostLocationAndDate = styled.div`
  position: absolute;
  top: 60%;
  right: 0;
  transform: translateY(-50%);
  text-align: right;
  line-height: 1.5;
  color: #646464;
`;

const PostLocation = styled.div`
  color: #646464;
  font-size: 13px;
`;

const PostDate = styled.div`
  color: #646464;
`;

const PostNinkname = styled.span`
  color: #555;
`;

const PostStats = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-left: 12px;
  .icon {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: #777;
  }
`;

const PostStat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #777;
`;

// 더미 데이터 생성
const generateDummyPosts = (startId = 1, count = 10) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${startId + i}-${Date.now()}`, // 고유한 id 생성
    title: `제목 ${startId + i}`,
    content: `봉은사 근처 산책 파트너를 찾습니다...`,
    author: {
      nickname: `꾸앵`,
    },
    background: `/placeholder-image.jpg`,
    location: {
      district: `강남구`,
      neighborhood: `삼성동`,
    },
    likes_count: `10`,
    comments_count: `5`,
    size: `소형견`,
    created_at: `2024.12.03 15:05`,
  }));

function WorkCommunity() {
  const [posts, setPosts] = useState(generateDummyPosts());
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    region: '',
    subRegion: '',
    size: '소형견',
    sortBy: '최신순',
  });
  const observer = useRef();
  const currentPostId = useRef(1);
  const navigate = useNavigate();

  // 무한 스크롤 fetch
  const fetchPosts = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const newPosts = generateDummyPosts(currentPostId.current, 10);
      currentPostId.current += 10;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);

      if (currentPostId.current > 100) {
        setHasMore(false);
      }
    }, 1000);
  }, []);

  // Lazy Loading 및 Infinite Scroll 처리
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPosts]
  );

  // 첫 렌더링 시 더미 데이터 로드
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 검색어 변경 시 자동 검색
  const searchPosts = useCallback(
    debounce((query) => {
      const filteredPosts = generateDummyPosts(1, 100).filter((post) =>
        post.title.includes(query)
      );
      setPosts(filteredPosts);
    }, 500), // 0.5초 debounce 적용
    []
  );

  useEffect(() => {
    if (searchQuery) {
      searchPosts(searchQuery);
    } else {
      fetchPosts(); // 검색어가 없을 경우 전체 데이터 가져오기
    }
  }, [searchQuery, searchPosts, fetchPosts]);

  const handleRefresh = () => {
    setFilters({
      region: '',
      subRegion: '',
      size: '소형견',
      sortBy: '최신순',
    });
    setSearchQuery('');
    currentPostId.current = 1;
    setPosts([]);
    fetchPosts();
  };

  const handleWrite = () => {
    navigate('/postpage');
    console.log('글쓰기 버튼 클릭됨');
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <MainPageWrapper>
      <Header title='산책메이트 커뮤니티' />
      <SearchBarContainer>
        <SearchInput
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterControls>
          <CancelButton onClick={handleToggleFilters}>
            {showFilters ? 'Close' : 'Filters'}
          </CancelButton>
          <WriteButton variant='send' size='medium' onClick={handleWrite}>
            글쓰기
          </WriteButton>
        </FilterControls>
      </SearchBarContainer>
      <FilterContainerWrapper>
        <FilterComponent
          $show={showFilters}
          filters={filters}
          setFilters={setFilters}
          handleRefresh={handleRefresh}
        />
      </FilterContainerWrapper>
      <PostListContainer>
        {posts.map((post, index) => (
          <PostItem
            key={post.id} // 고유한 key 값
            ref={index === posts.length - 1 ? lastPostRef : null}
          >
            <Link
              to={`postdetail/${post.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <PostImage />
              <PostContentWrapper>
                <PostTitle>{post.title}</PostTitle>
                <PostNinknameAndSize>
                  <PostNinkname>{post.size}</PostNinkname>
                  <PostNinkname>{post.author.nickname}</PostNinkname>
                </PostNinknameAndSize>
                <PostStats>
                  <PostStat>❤️ {post.likes_count}</PostStat>
                  <PostStat>💬 {post.comments_count}</PostStat>
                </PostStats>
                <PostMeta>
                  <PostLocationAndDate>
                    <PostLocation>
                      {post.location.district}-{post.location.neighborhood}
                    </PostLocation>
                    <PostDate>
                      {new Date(post.created_at).toLocaleString()}
                    </PostDate>
                  </PostLocationAndDate>
                </PostMeta>
              </PostContentWrapper>
            </Link>
          </PostItem>
        ))}
        {loading &&
          Array.from({ length: 15 }).map((_, i) => (
            <PostItem key={`skeleton-${currentPostId.current}-${i}`}>
              <Skeleton
                width={70}
                height={70}
                style={{ marginRight: '15px' }}
              />
              <PostContentWrapper>
                <Skeleton width={200} height={20} />
                <Skeleton
                  width={150}
                  height={15}
                  style={{ marginTop: '5px' }}
                />
              </PostContentWrapper>
              <Skeleton width={100} height={15} />
            </PostItem>
          ))}
      </PostListContainer>
    </MainPageWrapper>
  );
}

export default WorkCommunity;
