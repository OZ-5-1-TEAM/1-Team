import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import debounce from 'lodash.debounce';
import Button from '../components/Button';
import { useNavigate, Link, Outlet } from 'react-router-dom';
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
  user-select: none;
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
  line-height: 1.4;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #aaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

const PostLocation = styled.span`
  color: #555;
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

function DogCommunity() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    district: '',
    neighborhood: '',
    size: '소형견',
    sortBy: '최신순',
  });
  const observer = useRef();
  const currentPostId = useRef(1);
  const navigate = useNavigate();

  // Axios 인스턴스 생성
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // 임시 URL
    headers: {
      Authorization: 'Bearer your_access_token_here', // 실제 토큰으로 교체
    },
  });

  // 초기 게시물 로드 함수
  const fetchInitialPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/posts', {
        params: {
          ...filters,
          keyword: searchQuery,
          sort: 'latest',
          page: 1,
          size: 10,
        },
      });
      setPosts(response.data.posts || []);
      currentPage.current = 2; // 다음 페이지 설정
      setHasMore(response.data.posts?.length > 0);
    } catch (err) {
      console.error('게시물 초기 로드 실패:', err);
      setError('게시물을 불러오는 데 실패했습니다.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery]);

  // 무한 스크롤용 추가 게시물 로드 함수
  const fetchMorePosts = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/posts', {
        params: {
          ...filters,
          keyword: searchQuery,
          sort: 'latest',
          page: currentPage.current,
          size: 10,
        },
      });
      setPosts((prevPosts) => [...prevPosts, ...(response.data.posts || [])]);
      currentPage.current += 1;
      setHasMore(response.data.posts?.length > 0);
    } catch (err) {
      console.error('추가 게시물 로드 실패:', err);
      setError('추가 게시물을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery, hasMore, loading]);

  // Lazy Loading 및 Infinite Scroll 처리
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMorePosts]
  );

  // 검색어 변경 시 게시물 초기화 후 재검색
  const handleSearchQueryChange = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      currentPage.current = 1;
      fetchInitialPosts(); // 검색어 변경 시 초기화
    }, 500),
    [fetchInitialPosts]
  );

  // 초기 데이터 로드
  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  const handleRefresh = () => {
    setFilters({
      district: '',
      neighborhood: '',
      size: '소형견',
      sortBy: '최신순',
    });
    setSearchQuery('');
    currentPage.current = 1;
    fetchInitialPosts();
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
          onChange={(e) => handleSearchQueryChange(e.target.value)}
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
              to={`/dogcommunity/postdetail/${post.id}`}
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
                <PostDescription>
                  {post.content.slice(0, 20)}...
                </PostDescription>
                <PostMeta>
                  <PostStats>
                    <PostStat>❤️ {post.likes_count}</PostStat>
                    <PostStat>💬 {post.comments_count}</PostStat>
                  </PostStats>
                  <PostNinkname>{post.author.nickname}</PostNinkname>
                  <PostLocation>
                    {post.location.district}-{post.location.neighborhood},{' '}
                    {/* {post.size},{' '} 아직 API명세서에 안 보임*/}
                    {new Date(post.created_at).toLocaleString()}
                  </PostLocation>
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
      {/* <Outlet /> 추가 */}
      <Outlet />
    </MainPageWrapper>
  );
}

export default DogCommunity;
