import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPost } from "../features/middleware/postMiddleware";

const CreatePost = () => {
  const [textArea, setTextArea] = useState("");
  const user = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  console.log(user.isLoggedIn);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      setErr("Please login to continue");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/",
        {
          username: user.username,
          postDescription: textArea,
        },
        { headers }
      );
      console.log(res);
      setSelectedImage("");
      setTextArea("");
      dispatch(fetchPost());
    } catch (error) {
      setErr("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="p-4 border rounded flex gap-4  max-w-sm flex-col">
      <div className="">Create a New Post</div>
      <div className="text-lg text-clight">{user.username}</div>
      <form className="flex flex-col gap-4" onSubmit={handlePost}>
        <textarea
          required
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          cols="30"
          rows={3}
          placeholder="Start writing ..."
          className="bg-sky-900 p-2 min-h-8 resize-y auto-rows-auto  text-sm rounded-xl focus:outline-none"
        />
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={handleImageChange}
          className="hidden"
        />
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="mt-2 max-w-full"
          />
        )}
        {selectedImage && (
          <button
            className=" bg-red-500 flex-1 text-white py-2 px-4 rounded-md"
            type="submit"
            onClick={() => setSelectedImage(null)}
          >
            Remove Image
          </button>
        )}

        <div className="flex gap-4">
          <label
            htmlFor="imageInput"
            className="cursor-pointer flex-1 flex justify-center bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Select Image
          </label>
          <button
            className=" bg-blue-500 flex-1 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            POST
          </button>
        </div>
        <span className="text-xs text-red-700 indent-1">{err}</span>
      </form>
    </div>
  );
};

export default CreatePost;
