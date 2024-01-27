import { modalState } from '@/atoms/modalAtom';
import React from 'react';
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { db, storage } from '../../firebase';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { uploadString, getDownloadURL } from 'firebase/storage';
import { ref } from 'firebase/storage';

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const captionRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1. create a post and add to firestore 'posts' collection
    // 2. get the post ID for newly created post
    // 3. upload the image to firebase storage with the post ID
    // 4. get a download URL from firebase storage and update the original post with image

    const docRef = await addDoc(collection(db, 'posts'), {
      // image: selectedFile,
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log(docRef.id);
    // const imageRef = storage.ref(`posts/${docRef.id}/image`);
    try {
      // const imageRef = ref(storage, `posts/${docRef.id}/image`);
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      console.log(imageRef);

      await uploadString(imageRef, selectedFile, 'data_url').then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          await updateDoc(docRef, {
            image: downloadURL,
          });
          console.log(downloadURL);
        }
      );
    } catch (error) {
      console.error('error uplaoading image to storage', error);
    }

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center mt-10">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white rounded-lg p-8 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt=""
                    onClick={() => setSelectedFile(null)}
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center mx-auto h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      area-hidden="true"
                    />
                  </div>
                )}

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload a Photo
                  </Dialog.Title>
                  <div>
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      className="border-none focus:ring-0 w-full text-center"
                      ref={captionRef}
                      placeholder="Please enter a caption"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    disabled={!selectedFile}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:cursor-not-allowed hover:bg-gray-300 disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
