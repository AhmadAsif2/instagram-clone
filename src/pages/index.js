import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Feed from '@/components/Feed';
import Modal from '@/components/Modal';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Header />
      <Feed />

      {/* Modal */}
      <Modal />
    </div>
  );
}
