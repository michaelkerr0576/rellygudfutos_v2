// import { Request, Response, NextFunction } from 'express';

// const photos = [
//   { id: 1, name: 'Photo 1' },
//   { id: 2, name: 'Photo 2' },
//   { id: 3, name: 'Photo 3' },
//   { id: 4, name: 'Photo 4' },
//   { id: 5, name: 'Photo 5' },
//   { id: 6, name: 'Photo 6' },
//   { id: 7, name: 'Photo 7' },
//   { id: 8, name: 'Photo 8' },
//   { id: 9, name: 'Photo 9' },
//   { id: 10, name: 'Photo 10' },
//   { id: 11, name: 'Photo 11' },
//   { id: 12, name: 'Photo 12' },
// ];

// const paginateResults = (model: any) => {
//   return async (request: Request, _response: Response, _next: NextFunction) => {
//     const page = parseInt(request.query.page as string) || 1;
//     const limit = parseInt(request.query.limit as string) || 10;

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {};

//     if (endIndex < (await model.countDocuments().exec())) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }

//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//   };
// };

// export default paginateResults;
