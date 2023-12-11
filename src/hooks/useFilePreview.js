import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { toast } from "react-toastify";

export const useFilePreview = (fileId) => {
  const [filePreview, setFilePreview] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);

  async function getFilePreview(fileId) {
    setPreviewLoading(true);
    return appwriteService
      .getFilePreview(fileId)
      .then((res) => {
        setFilePreview(res);
        return res;
      })
      .catch(() => {
        toast.error("Error while rendering Image");
      });
    //   .finally(() => {
    //     setPreviewLoading(false);
    //   });
  }

  useEffect(() => {
    getFilePreview(fileId);
  }, [fileId]);

  return { filePreview, previewLoading, setPreviewLoading };
};
