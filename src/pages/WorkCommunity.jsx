import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import debounce from 'lodash.debounce';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const MainPageWrapper = styled.div`
  padding-top: 130px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding-bottom: 63px;
  min-height: 100vh;
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

const FilterContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'show', // show prop이 DOM으로 전달되지 않도록 설정
})`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap; /* 화면이 작아질 경우 자동으로 줄바꿈 */
`;

const Select = styled.select`
  height: 30px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SortLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;

  input {
    margin-right: 5px;
  }
`;

const RefreshButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffa000;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
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
  margin: 20px 0;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center; /* 이미지와 텍스트를 수직 가운데 정렬 */
  justify-content: space-between; /* 텍스트와 메타 데이터를 양쪽으로 배치 */
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
  flex: 1; /* 텍스트가 남은 공간을 차지하도록 설정 */
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
  text-align: right; /* 날짜와 동네 태그를 오른쪽으로 정렬 */
`;

// 더미 데이터 생성
const generateDummyPosts = (startId = 1, count = 10) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${startId + i}-${Date.now()}`, // 고유한 id 생성
    title: `제목 ${startId + i}`,
    content: `봉은사 근처 산책 파트너를 찾습니다...`,
    background: `/placeholder-image.png`,
    district: `강남구`,
    neighborhood: `삼성동`,
    size: `소형견`,
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
          <CancelButton onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Close' : 'Filters'}
          </CancelButton>
          <WriteButton variant='send' size='medium' onClick={handleWrite}>
            글쓰기
          </WriteButton>
        </FilterControls>
      </SearchBarContainer>
      <FilterContainer show={showFilters}>
        <FilterRow>
          <Select
            value={filters.region}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          >
            <option value=''>구 선택</option>
            <option value='강남구'>강남구</option>
            <option value='서초구'>서초구</option>
          </Select>
          <Select
            value={filters.subRegion}
            onChange={(e) =>
              setFilters({ ...filters, subRegion: e.target.value })
            }
          >
            <option value=''>동 선택</option>
            <option value='삼성동'>삼성동</option>
            <option value='역삼동'>역삼동</option>
          </Select>
          <Select
            value={filters.size}
            onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          >
            <option value='소형견'>소형견</option>
            <option value='중형견'>중형견</option>
            <option value='대형견'>대형견</option>
          </Select>
          <SortOptions>
            <SortLabel>
              <input
                type='radio'
                name='sort'
                value='최신순'
                checked={filters.sortBy === '최신순'}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
              />
              최신순
            </SortLabel>
            <SortLabel>
              <input
                type='radio'
                name='sort'
                value='인기순'
                checked={filters.sortBy === '인기순'}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
              />
              인기순
            </SortLabel>
            <RefreshButton onClick={handleRefresh}>⟳</RefreshButton>
          </SortOptions>
        </FilterRow>
      </FilterContainer>
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

export default WorkCommunity;
