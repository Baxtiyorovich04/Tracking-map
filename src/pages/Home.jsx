import { Layout, Button, Input, List, Typography, DatePicker, Badge, Drawer } from 'antd';
import { LogoutOutlined, SearchOutlined, ExportOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs';
import { useState } from 'react';
import '../scss/home.scss';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const Home = () => {
  const { logout } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());

  const couriers = [
    {
      id: 1,
      name: "Imonali Yuldashev BILTON",
      time: "10:47:22",
      coordinates: [41.2995, 69.2401],
      status: "Был в Т.Т."
    },
    {
      id: 2,
      name: "Eldor Hamid",
      time: "11:48:12",
      coordinates: [41.3115, 69.2401],
      status: "Был в Т.Т."
    },
  ];

  const mapCenter = [41.2995, 69.2401];

  const handleDateTimeChange = (date) => {
    if (date) {
      setSelectedDateTime(date);
    }
  };

  const SidebarContent = () => (
    <div className="sidebar-content">
      <div className="time-selector">
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          className="datetime-picker"
        />
      </div>
      <div className="courier-name">
        <Text strong>Sarvar</Text>
      </div>
      <Button icon={<ExportOutlined />} className="export-button">
        Экспорт
      </Button>
      <List
        className="courier-list"
        itemLayout="horizontal"
        dataSource={couriers}
        renderItem={(item, index) => (
          <List.Item className="courier-item">
            <List.Item.Meta
              avatar={
                <Badge status="success" />
              }
              title={
                <div className="courier-header">
                  <Text>{`${index + 1}. ${item.name}`}</Text>
                  <Button type="link" icon={<UserOutlined />} size="small">
                    профиль
                  </Button>
                </div>
              }
              description={
                <div className="courier-details">
                  <Text type="secondary">{item.time}</Text>
                  <Text type="success">{item.status}</Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Layout className="home-layout">
      <Header className="header">
        <div className="header-left">
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            className="menu-button"
            onClick={() => setDrawerVisible(true)}
          />
          <h1>Маршрут доставщика: Sarvar</h1>
        </div>
        <Button 
          type="text" 
          icon={<LogoutOutlined />} 
          onClick={logout}
          className="logout-button"
        >
          Выйти
        </Button>
      </Header>
      <Layout>
        <Sider width={300} className="site-sider">
          <SidebarContent />
        </Sider>
        <Content className="content">
          <div className="search-container">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Адрес или объект"
              className="search-input"
            />
            <Button type="primary">Найти</Button>
          </div>
          <div className="map-container">
            <YMaps>
              <Map
                defaultState={{
                  center: mapCenter,
                  zoom: 12,
                }}
                width="100%"
                height="100%"
              >
                {couriers.map((courier) => (
                  <Placemark
                    key={courier.id}
                    geometry={courier.coordinates}
                    options={{
                      preset: 'islands#blueDeliveryIcon',
                    }}
                  />
                ))}
                <Polyline
                  geometry={couriers.map(c => c.coordinates)}
                  options={{
                    strokeColor: '#1890ff',
                    strokeWidth: 4,
                  }}
                />
              </Map>
            </YMaps>
          </div>
        </Content>
      </Layout>
      <Drawer
        title="Меню"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="mobile-drawer"
        width={300}
      >
        <SidebarContent />
      </Drawer>
    </Layout>
  );
};

export default Home; 