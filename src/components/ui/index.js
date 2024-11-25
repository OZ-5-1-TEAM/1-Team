export { default as SectionList } from './SectionList';
export { default as PostList } from './PostList';

/*
예시
import { SectionList, PostList } from '../components/ui'
*/

// import React from 'react';
// import { SectionList, PostList } from '../components/ui';

// const CommunityPage = () => {
//   const sections = [
//     { id: 1, category: 'Popular', postTitle: 'Hot Post 1', path: '/post/1' },
//     { id: 2, category: 'Recent', postTitle: 'New Post 2', path: '/post/2' },
//   ];

//   const posts = [
//     {
//       id: 1,
//       category: '2024-11-21',
//       postTitle: 'First Post',
//       postContent: 'This is a preview of the content',
//       path: '/post/1',
//     },
//     {
//       id: 2,
//       category: '2024-11-20',
//       postTitle: 'Second Post',
//       postContent: 'Another preview',
//       path: '/post/2',
//     },
//   ];

//   return (
//     <div>
//       <SectionList
//         sections={sections}
//         sectionTitle="Community Sections"
//         sectionPath="/community"
//       />
//       <PostList posts={posts} />
//     </div>
//   );
// };

// export default CommunityPage;
