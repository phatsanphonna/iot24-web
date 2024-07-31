import { Alert, Button } from '@mantine/core'
import Layout from '../components/layout'
import cafeBackgroundImage from "../assets/images/coffee-1.jpg";
import Loading from '../components/loading';
import { Menu } from '../lib/models';
import { IconAlertTriangleFilled, IconPlus } from '@tabler/icons-react';
import useSWR from 'swr';
import MenuCard from '../components/MenuCard';
import { Link } from 'react-router-dom';


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

          <Button
            component={Link}
            leftSection={<IconPlus />}
            to="/menu/create"
            size="xs"
            variant="primary"
            className="flex items-center space-x-2"
          >
            เพิ่มเมนู
          </Button>
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