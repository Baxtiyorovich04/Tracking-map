import React, { useState, useEffect } from 'react';
import { Layout, Button, Input, List, Typography, DatePicker, Badge, Drawer, Select } from 'antd';
import { LogoutOutlined, SearchOutlined, ExportOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs';
import '../scss/home.scss';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const Home = () => {
  const { logout } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [selectedCourier, setSelectedCourier] = useState(null);
  
  // Пример данных курьеров с их маршрутами
  const couriers = [
    {
      id: 1,
      name: "Imonali Yuldashev BILTON",
      time: "10:47:22",
      coordinates: [41.2995, 69.2401],
      status: "Был в Т.Т.",
      route: [
        [41.2995, 69.2401],
        [41.3015, 69.2451],
        [41.3045, 69.2501],
        [41.3075, 69.2551],
      ]
    },
    {
      id: 2,
      name: "Eldor Hamid",
      time: "11:48:12",
      coordinates: [41.3115, 69.2401],
      status: "Был в Т.Т.",
      route: [
        [41.3115, 69.2401],
        [41.3135, 69.2451],
        [41.3165, 69.2501],
        [41.3195, 69.2551],
      ]
    },
  ];

  // Центр карты - Ташкент
  const mapCenter = [41.2995, 69.2401];

  const handleDateTimeChange = (date) => {
    if (date) {
      setSelectedDateTime(date);
      // Здесь можно добавить обновление маршрутов при изменении времени
    }
  };

  const handleCourierChange = (courierId) => {
    setSelectedCourier(courierId);
  };

  const selectedCourierData = couriers.find(c => c.id === selectedCourier);

  const SidebarContent = () => (
    <div className="sidebar-content">
      <div className="courier-selector">
        <Select
          placeholder="Выберите курьера"
          style={{ width: '100%' }}
          onChange={handleCourierChange}
          value={selectedCourier}
        >
          {couriers.map(courier => (
            <Select.Option key={courier.id} value={courier.id}>
              {courier.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="time-selector">
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          className="datetime-picker"
        />
      </div>
      {selectedCourierData && (
        <div className="courier-name">
          <Text strong>{selectedCourierData.name}</Text>
        </div>
      )}
      <Button icon={<ExportOutlined />} className="export-button">
        Экспорт
      </Button>
      <List
        className="courier-list"
        itemLayout="horizontal"
        dataSource={couriers}
        renderItem={(item, index) => (
          <List.Item 
            className={`courier-item ${item.id === selectedCourier ? 'selected' : ''}`}
            onClick={() => handleCourierChange(item.id)}
          >
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
          <h1>
            {selectedCourierData 
              ? `Маршрут доставщика: ${selectedCourierData.name}`
              : 'Выберите курьера'}
          </h1>
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
                {couriers.map(courier => (
                  <React.Fragment key={courier.id}>
                    <Placemark
                      geometry={courier.coordinates}
                      options={{
                        preset: 'islands#blueDeliveryIcon',
                        iconColor: courier.id === selectedCourier ? '#1890ff' : '#8c8c8c',
                      }}
                    />
                    {courier.route && (
                      <Polyline
                        geometry={courier.route}
                        options={{
                          strokeColor: courier.id === selectedCourier ? '#1890ff' : '#d9d9d9',
                          strokeWidth: courier.id === selectedCourier ? 4 : 2,
                          strokeOpacity: courier.id === selectedCourier ? 0.8 : 0.4,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
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