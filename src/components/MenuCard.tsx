import axios, { AxiosError } from 'axios';
import { Menu } from '../lib/models'
import { notifications } from '@mantine/notifications';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconTrash } from '@tabler/icons-react';

interface Props {
  menu: Menu;
}

const MenuCard: React.FC<Props> = ({ menu }) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [remark, setRemark] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const orderMenu = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const { status } = await axios.post(`/orders`, [
      {
        menu_id: menu.id,
        quantity,
        remark,
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

    setIsProcessing(false);
    setQuantity(1);
    setRemark('');
  }

  const handleDelete = async () => {
    try {
      setIsProcessing(true);
      await axios.delete(`/menus/${menu.id}`);
      notifications.show({
        title: "ลบเมนูสำเร็จ",
        message: "ลบเมนูเล่มนี้ออกจากระบบเรียบร้อยแล้ว",
        color: "red",
      });
      navigate("/menu");
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          notifications.show({
            title: "ไม่พบข้อมูลเมนู",
            message: "ไม่พบข้อมูลเมนูที่ต้องการลบ",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border border-solid border-neutral-200" key={menu.id}>
      <div className="p-4">
        <div className='flex justify-between items-center'>
          <h2 className="text-lg font-semibold line-clamp-2">{menu.name}</h2>

          <IconTrash
            onClick={handleDelete}
            className="cursor-pointer"
            size={16}
            color="red"
          />
        </div>
        <p className="text-sm text-neutral-500">{menu.price} บาท</p>
      </div>

      <div className="p-4">
        <TextInput
          disabled={isProcessing}
          value={remark}
          onChange={(event) => setRemark(event.currentTarget.value)}
          placeholder="หมายเหตุ"
        />
      </div>

      <div className="flex justify-between px-4 pb-2">
        <TextInput
          disabled={isProcessing}
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => setQuantity(parseInt(event.currentTarget.value))}
          placeholder="จำนวน"
          className="w-1/3"
        />
        <Button size="xs" variant="default" onClick={orderMenu} disabled={isProcessing}>
          สั่ง
        </Button>
      </div>
    </div>
  )
}

export default MenuCard