import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/notdb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../store/notificationsSlice";
import { setDraftField, resetDraft, loadDraft } from "../../store/editorDraftSlice";
import authService from "../../appwrite/auth";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const draft = useSelector((state) => state.editorDraft);
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {

        // const userID = userData?.$id || (await authService.getCurrentUser())?.$id;

        // if(!userID){
        //     alert ("You must be logged in to create a post.")
        //     return
        // }

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    dispatch(addToast({ type: "success", message: "Post created successfully" }));
                    dispatch(resetDraft());
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
            if (name && Object.prototype.hasOwnProperty.call(value, name)) {
                const nextValue = value[name];
                if (name === "content") {
                    dispatch(setDraftField({ field: "content", value: nextValue }));
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, dispatch]);

    React.useEffect(() => {
        if (!post && draft) {
            if (draft.title) setValue("title", draft.title);
            if (draft.slug) setValue("slug", draft.slug);
            if (draft.content) setValue("content", draft.content);
            if (draft.status) setValue("status", draft.status);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onInvalid = (errors) => {
        if (errors.image) {
            dispatch(addToast({ type: "warning", message: "Featured image is required" }));
        }
    };

    return (
        <form onSubmit={handleSubmit(submit, onInvalid)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    onChange={(e) => dispatch(setDraftField({ field: "title", value: e.target.value }))}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        dispatch(setDraftField({ field: "slug", value: slugTransform(e.currentTarget.value) }));
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    onChange={(e) => dispatch(setDraftField({ field: "status", value: e.target.value }))}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}