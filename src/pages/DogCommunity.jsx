import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import debounce from 'lodash.debounce';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import FilterComponent from '../components/FilterComponent';

const MainPageWrapper = styled.div`
  padding-top: 130px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding-bottom: 63px;
  min-height: 100vh;
  box-sizing: border-box; /* 패딩 포함 계산 */
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
  width: 100%; /* 화면 너비에 맞게 설정 */
  box-sizing: border-box; /* 패딩 포함 계산 */

  @media (max-width: 425px) {
    padding: 10px 10px; /* 작은 화면에서 패딩 조정 */
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
  background-image: url('/placeholder-image.png');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const PostContentWrapper = styled.div`
  flex: 1; /* 텍스트 */
  display: flex;
  flex-direction: column;
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
  margin: 20px 0 0 10px;
`;

const PostDescription = styled.p`
  font-size: 14px;
  color: #777;
  margin: 5px 0 0 10px;
  line-height: 1.4; /* 읽기 편하게 간격 추가 */
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #aaa;
  text-align: right; /* 날짜, 동네 태그 */
`;

// 더미 데이터 생성
const generateDummyPosts = (startId = 1, count = 10) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${startId + i}-${Date.now()}`, // 고유한 id 생성
    title: `제목 ${startId + i}`,
    content: `강아지 다이어트 방법 좀 알려주세요...`,
    background: `/placeholder-image.png`,
    district: `강남구`,
    neighborhood: `삼성동`,
    size: `소형견`,
  }));

function DogCommunity() {
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
      <Header title='강아지 커뮤니티' />
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
              to={`/postdetail/${post.id}`}
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
                <PostDescription>{post.content}</PostDescription>
                <PostMeta>
                  {post.district} {post.neighborhood}, {post.size} ,{' '}
                  {new Date().toLocaleDateString()}
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

export default DogCommunity;
