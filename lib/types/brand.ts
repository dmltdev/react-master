/**
 * A branded type utility that creates distinct types from the same underlying type.
 * This prevents accidentally mixing up values that should be treated differently,
 * even though they have the same base type (like string or number).
 *
 * The brand acts as an invisible "tag" that TypeScript uses to distinguish between
 * different branded types at compile time.
 * @example
 * type UserID = Brand<string, "UserId">
 * type PostID = Brand<string, "PostId">
 * type CommentID = Brand<string, "CommentId">
 *
 * type User = {
 *   id: UserID;
 *   name: string;
 * }
 *
 * type Post = {
 *   id: PostID;
 *   ownerId: string;
 *   comments: Comments[];
 * }
 *
 * type Comments = {
 *   id: CommentID;
 *   timestamp: string;
 *   body: string;
 *   authorId: UserID;
 * }
 *
 * async function getCommentsForPost(postId: PostID, authorId: UserID) {
 *   const response = await api.get(`/author/${authorId}/posts/${postId}/comments`)
 *   return response.data
 * }
 *
 * const comments = await getCommentsForPost(user.id, post.id) // ❌ This fails since `user.id` is of type UserID and no PostID as expected
 * // ^Argument of type 'UserID' is not assignable to parameter of type 'PostID'.
 * //  Type 'UserID' is not assignable to type '{ __brand: "PostId"; }'.
 * //    Types of property '__brand' are incompatible.
 * //      Type '"UserId"' is not assignable to type '"PostId"'.
 */
export type Brand<K, T> = K & { __brand: T };
