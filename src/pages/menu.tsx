import { Alert, Button } from '@mantine/core'
import Layout from '../components/layout'
import cafeBackgroundImage from "../assets/images/coffee-1.jpg";
import Loading from '../components/loading';
import { Menu } from '../lib/models';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import useSWR from 'swr';
import axios from 'axios';
import { notifications } from '@mantine/notifications';


const MenuPage: React.FC = () => {
  const { data: menus, error } = useSWR<Menu[]>("/menus");

  const orderMenu = async (menuId: number, quantity: number = 1) => {
    const { status } = await axios.post(`/orders`, [
      {
        menu_id: menuId,
        quantity,
      }
    ]);

    if (status === 200) {
      notifications.show({
        title: "สั่งเครื่องดื่มสำเร็จ",
        message: "เครื่องดื่มได้รับการสั่งเรียบร้อยแล้ว",
        color: "teal",
      });
    } else {
      notifications.show({
        title: "เกิดข้อผิดพลาดในการสั่งเครื่องดื่ม",
        message: "กรุณาลองใหม่อีกครั้ง",
        color: "red",
      });
    }
  }

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
            <div className="border border-solid border-neutral-200" key={menu.id}>
              <img
                src="https://placehold.co/150x200"
                alt={menu.name}
                className="w-full object-cover aspect-[3/4]"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">{menu.name}</h2>
                <p className="text-sm text-neutral-500">{menu.price} บาท</p>
              </div>

              <div className="flex justify-end px-4 pb-2">
                <Button size="xs" variant="default" onClick={() => orderMenu(menu.id)}>
                  สั่ง
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default MenuPage