import styled from 'styled-components';

const FilterComponentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  padding: ${(props) => (props.$show ? '10px 20px' : '0')};
  overflow: hidden;
  height: ${(props) => (props.$show ? 'auto' : '0')};
  transition: all 0.3s ease;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
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

const FilterComponent = ({ $show, filters, setFilters, handleRefresh }) => {
  return (
    <FilterComponentWrapper $show={$show}>
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
    </FilterComponentWrapper>
  );
};

export default FilterComponent;
