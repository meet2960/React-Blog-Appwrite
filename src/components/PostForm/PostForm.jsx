import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { RTE, InputField, SelectField } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PostForm = ({ post }) => {
  console.log("update post", post);
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
    },
  });
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const updateFormData = async (data) => {
    console.log("fiorm data", data);
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
      // const file = data.image[0];
      // if (file) {
      //   appwriteService
      //     .uploadFile(file)
      //     .then(async (uploadedFile) => {
      //       const fileId = uploadedFile.$id;
      //       data.featuredImage = fileId;
      //       console.log("uploadedFile File", uploadedFile);
      //       return appwriteService
      //         .createPost({
      //           ...data,
      //           userId: userData.$id,
      //         })
      //         .then((newPost) => {
      //           console.log("Response of Created Post", newPost);
      //           toast.success("Post Created Successfully");
      //           navigate(`/post/${newPost.$id}`);
      //         })
      //         .catch(() => {
      //           toast.error("Error While Creating Post");
      //         });
      //     })
      //     .catch((error) => {
      //       console.log("Error in upload file", error);
      //     });
      // }
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          toast.success("success");
          navigate(`/post/${dbPost.$id}`);
        }
      }
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
              options={["active", "inactive"]}
              label="Status"
              {...register("status", { required: true })}
            />
          </Col>
          <Col xs={12}>
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </Col>
          <Col xs={12}>
            <div className="d-flex justify-content-center align-items-center">
              <div className="col-3">
                <Button className="w-100" type="submit">
                  {isSubmitting ? (
                    <React.Fragment>
                      <Spinner size="sm" />
                    </React.Fragment>
                  ) : post ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={12}>
            <div className="">
              {post && (
                <div className="w-full mb-4">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg img-fluid"
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default PostForm;
