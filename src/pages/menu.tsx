import { Alert, Button } from '@mantine/core'
import Layout from '../components/layout'
import cafeBackgroundImage from "../assets/images/coffee-1.jpg";
import Loading from '../components/loading';
import { Menu } from '../lib/models';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import useSWR from 'swr';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import MenuCard from '../components/MenuCard';


const MenuPage: React.FC = () => {
  const { data: menus, error } = useSWR<Menu[]>("/menus");

  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">เครื่องดื่ม</h1>
        <h2>รายการเครื่องดื่มทั้งหมด</h2>
      </section>

      <section className="container mx-auto py-8">
        <div className="flex justify-between">
          <h1>รายการเครื่องดื่ม</h1>
        </div>

        {!menus && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menus?.map((menu) => (
            <MenuCard menu={menu} key={menu.id} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default MenuPage