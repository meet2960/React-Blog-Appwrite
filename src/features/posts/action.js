import appwriteService from "@/appwrite/config";
import { Query } from "appwrite";
import { postSlice } from "./postSlice";
import { toast } from "react-toastify";
const { actions } = postSlice;

export const getAllUserPosts = (loginUserId) => async (dispatch) => {
  console.log("Calling home api", loginUserId);
  return appwriteService
    .getSelectedUserPost([Query.equal("userId", loginUserId.$id)])
    .then((res) => {
      dispatch(actions.getUserPosts(res.documents));
    })
    .catch((error) => {
      console.log("Error in single post", error);
    });
};

export const getSelectedPost = (slug) => async (dispatch) => {
  return appwriteService
    .getSinglePost(slug)
    .then((post) => {
      if (post) {
        console.log("selected post", post);
        dispatch(actions.getSelectedPost(post));
        return post;
      }
    })
    .catch(() => {
      toast.error("Error While Fetching Post");
    });
};

export const createNewPost = (postData, userId) => async (dispatch) => {
  return appwriteService
    .uploadFile(postData.image[0])
    .then((uploadedFile) => {
      if (uploadedFile) {
        console.log("response of file upload,", uploadedFile);
        const fileId = uploadedFile.$id;
        postData.featuredImage = fileId;
        console.log("postdata after file upload", postData);
        return appwriteService
          .createPost(userId, postData.slug, postData)
          .then((createdPost) => {
            if (createdPost) {
              toast.success("Post Created Successfully");
              return createdPost;
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    })
    .catch((error) => {
      console.log("Error While Uploading FIle", error);
      toast.error(error.message);
    });
};

export const deletePost = (post) => async (dispatch) => {
  return appwriteService
    .deletePost(post.$id)
    .then((status) => {
      if (status) {
        console.log("Status of Delete");
        toast.success("Post Deleted Successfully");
        return appwriteService
          .deleteFile(post.featuredImage)
          .then((response) => {
            console.log("deleteFile", response);
            return response;
          })
          .catch(() => {});
      }
    })
    .catch(() => {
      toast.error("Error While deleting Post");
      console.log("Error in my delete post");
    });
};
