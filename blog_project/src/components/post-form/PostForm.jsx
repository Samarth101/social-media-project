import React,{ useCallback} from "react";
import { Form, useForm } from 'react-hook-form'
import Button from "../Button"
import Input from "../Input"
import RTE from '../RTE'
import Select from '../Select'
import appwriteService from '../../appwrite/config'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



export default function PostForm ({post}){
    const {register, handleSubmit, watch, setValue ,control, getValues} = useForm ({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            constent: post?.status || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const sumbit = async (data) => { 
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]): null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost= await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate('/post/${dbPost.$id}')
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])
            if (file ) {
                const fieldid = field.$id
                data.featuredImage = field
                const dbPost = await appwriteService.createPost( {...data, userId: userData.$id})

                if (dbPost) {
                    navigate('/post/${dbPost.$id}')
                }
            }
        }
    }
    
    const slugTransform = useCallback((value) => {
        if (value && typeof value=== "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
         
    }, [])

    React.useEffect(() => {
        watch((value, {name}) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), {shouldValidate: true})
        }
    }) 
    },[watch, slugTransform, setValue])

    return (
        <form action="" onSubmit={handleSubmit(sumbit)} 
        className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                label = "Title"
                placeholder = 'Title'
                className= "m-4"
                {...register("title", {required:true})}/>
                <Input 
                label ="slug: "
                placeholder= "slug"
                className= "mb-4"
                {...register("slug", {required: true})} 
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}/>
                < RTE 
                label="Content:"
                name="Content"
                control={control}
                defaultValue={getValues("constent")}/>
            </div>
            <div className="1/3 px-2">
                <Input
                label ="Featured Image "
                placeholder= "file"
                className= "mb-4"
                accept= "image/png, image/jpg, image/jpeg"
                {...register("image"), {required: !post}}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} 
                        className="rounfed-lg"/>
                    </div>
                )}
                <Select 
                options ={["active", "inactive"]}
                lable="Statue"
                className="mb-4"
                {...register("status", {required:true})}
                />
                <Button
                type="submit"
                bgColor= {post ? "bg-green-500" : undefined}
                className="w-full" > 
                    {post ? "Update" : "Submit"} 
                </Button>
            </div> 
        </form>
    )
}