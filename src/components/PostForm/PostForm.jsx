import  { useCallback } from "react";
import { useForm } from "react-hook-form";
import {  Col, Row,} from "react-bootstrap";
import { RTE, InputField, SelectField } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { toast } from "react-toastify";
import { useFilePreview } from "../../hooks/useFilePreview";
import { createNewPost } from "../../features/posts/action";
import LoadingButton from "../Common/LoadingButton";

const PostForm = ({ post }) => {
  const dispatch = useDispatch();
  const { filePreview,} = useFilePreview(
    post?.featuredImage ? post.featuredImage : ""
  );
  console.log("update post", post);
  console.log("update Re rendering");
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.slug || "",
      status: post?.status || "active",
      visibility: post?.visibility || "public",
    },
    values: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.slug || "",
      status: post?.status || "active",
      visibility: post?.visibility || "public",
    },
  });
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  console.log("component data", userData);

  const updateFormData = async (data) => {
    console.log("component data", data);
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post?.featureImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      return dispatch(createNewPost(data, userData.$id)).then((post) => {
        navigate(`/post/${post.$id}`);
      });
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit(updateFormData)} className="flex flex-wrap">
        <Row className="gy-4">
          <Col xs={12} lg={6}>
            <InputField
              label="Title :"
              placeholder="Title"
              {...register("title", { required: true })}
            />
          </Col>
          <Col xs={12} lg={6}>
            <InputField
              label="Slug :"
              placeholder="Slug"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          </Col>
          <Col xs={12} lg={6}>
            <InputField
              label="Featured Image :"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
          </Col>

          <Col xs={12} lg={6}>
            <SelectField
              options={["Active", "Inactive"]}
              label="Status"
              {...register("status", { required: true })}
            />
          </Col>

          <Col xs={12} lg={6}>
            <SelectField
              options={["Public", "Private"]}
              label="Visibility"
              {...register("visibility", { required: true })}
            />
          </Col>
          <Col xs={6}>
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </Col>
          <Col xs={6}>
            <div className="">
              {post && (
                <div className="w-full mb-4">
                  <label className="form-label">File</label>
                  <img
                    src={filePreview}
                    alt={post.title}
                    className="rounded-lg img-fluid"
                  />
                </div>
              )}
            </div>
          </Col>
          <Col xs={12}>
            <div className="d-flex justify-content-center align-items-center">
              <div className="col-3">
                <LoadingButton
                  type="submit"
                  className="w-100"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {post ? "Update" : "Submit"}
                </LoadingButton>
              </div>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default PostForm;
