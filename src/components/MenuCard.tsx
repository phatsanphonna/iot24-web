import axios from 'axios';
import { Menu } from '../lib/models'
import { notifications } from '@mantine/notifications';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';

interface Props {
  menu: Menu;
}

const MenuCard: React.FC<Props> = ({ menu }) => {
  const [quantity, setQuantity] = useState(1);
  const [remark, setRemark] = useState('');

  const orderMenu = async () => {
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
  }

  return (
    <div className="border border-solid border-neutral-200" key={menu.id}>
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-2">{menu.name}</h2>
        <p className="text-sm text-neutral-500">{menu.price} บาท</p>
      </div>

      <div className="p-4">
        <TextInput
          value={remark}
          onChange={(event) => setRemark(event.currentTarget.value)}
          placeholder="หมายเหตุ"
        />
      </div>

      <div className="flex justify-between px-4 pb-2">
        <TextInput
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => setQuantity(parseInt(event.currentTarget.value))}
          placeholder="จำนวน"
          className="w-1/3"
        />
        <Button size="xs" variant="default" onClick={orderMenu}>
          สั่ง
        </Button>
      </div>
    </div>
  )
}

export default MenuCard