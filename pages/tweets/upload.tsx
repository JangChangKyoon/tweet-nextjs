import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UploadProductForm {
  name: string;
  description: string;
}

const Upload: NextPage = () => {
  //1. useForm을 사용
  const { register, handleSubmit } = useForm<UploadProductForm>();
  // 3. register으로 유효성 검사 설정하기
  const [uploadProduct, { loading, data }] = useMutation("/api/products");
  //7. mutation 만들기
  const onValid = (data: UploadProductForm) => {
    //6. handleSubmit으로 데이터 받아오기
    // console.log(data);
    //6-2. 데이터가 잘 들어가는지 확인하기
    if (loading) return;
    uploadProduct(data);

    const router = useRouter();
    // useEffect(()=>{
    //       if(data?.ok){
    // router.replace(`/products/${data.tweet.id}`)
    //   }
    // })
  };
  return (
    <Layout canGoBack title="Upload Product">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register("name", { required: false })}
          label="title"
          name="title"
          type="text"
          kind="text"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
          required
        />
        <Button text={loading ? "Loading..." : "Upload item"} />
      </form>
    </Layout>
  );
};

export default Upload;
