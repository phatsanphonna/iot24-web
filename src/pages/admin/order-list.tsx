import { Alert, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core'
import { Order } from '../../lib/models';
import useSWR from 'swr';
import Loading from '../../components/loading';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import Layout from '../../components/layout';
import cafeBackgroundImage from '../../assets/images/bg-cafe-1.jpg';

const AdminOrderListPage: React.FC = () => {
  const { data: orders, error } = useSWR<Order[]>("/orders");

  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ออเดอร์</h1>
        <h2>รายการออเดอร์ทั้งหมด</h2>
      </section>

      <section className="container mx-auto py-8">
        {(!orders && !error) ? <Loading /> : (
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Order ID</TableTh>
                <TableTh>Menu</TableTh>
                <TableTh>Quantity</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {orders?.map((order) => (
                <TableTr key={order.id}>
                  <TableTd>{order.id}</TableTd>
                  <TableTd>{order.menu?.name}</TableTd>
                  <TableTd>{order.quantity}</TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        )}

        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}
      </section>
    </Layout>
  )
}

export default AdminOrderListPage