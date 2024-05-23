import React, { useState, useEffect } from 'react';
import { Layout, Table, Input, Dropdown, Menu, Button, Space, Typography, Row, Col } from 'antd';
import {  DownOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Dashboard.css'; // Custom styles for Dashboard

import Login from './Login';
import {CSVLink} from 'react-csv'

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [sortInfo, setSortInfo] = useState({ columnKey: null, order: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [authentication, setAuthenticated] = useState(false);

  useEffect(() => {

    if(authentication){
    fetchBooks();
    }
  }, [pagination, sortInfo, searchQuery, authentication]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&page=${pagination.current}&limit=${pagination.pageSize}`);
      const data = response.data.docs.map(book => ({
        key: book.key,
        title: book.title,
        author_name: book.author_name ? book.author_name.join(', ') : 'N/A',
        first_publish_year: book.first_publish_year,
        subject: book.subject ? book.subject.join(', ') : 'N/A',
        ratings_average: book.ratings_average || 'N/A',
        author_birth_date: book.author_birth_date || 'N/A',
        author_top_work: book.author_top_work || 'N/A',
      }));
      sortData(data);
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSort = ({ key }) => {
    const [columnKey, order] = key.split('_');
    setSortInfo({ columnKey, order });
  };

  const sortData = (data) => {
    if (sortInfo.columnKey) {
      data.sort((a, b) => {
        if (sortInfo.order === 'ascend') {
          return a[sortInfo.columnKey] > b[sortInfo.columnKey] ? 1 : -1;
        } else {
          return a[sortInfo.columnKey] < b[sortInfo.columnKey] ? 1 : -1;
        }
      });
    }
  };

  const handlelogin = (username, password) =>{
         if(username === 'admin' && password === 'password'){
          setAuthenticated(true);
         }else{
          alert('Invaild username or password' );
         }
  };

  const sortMenu = (
    <Menu onClick={handleSort}>
      <Menu.Item key="title_ascend">Sort Title Ascending</Menu.Item>
      <Menu.Item key="title_descend">Sort Title Descending</Menu.Item>
      <Menu.Item key="author_name_ascend">Sort Author Name Ascending</Menu.Item>
      <Menu.Item key="author_name_descend">Sort Author Name Descending</Menu.Item>
      <Menu.Item key="first_publish_year_ascend">Sort First Publish Year Ascending</Menu.Item>
      <Menu.Item key="first_publish_year_descend">Sort First Publish Year Descending</Menu.Item>
      <Menu.Item key="ratings_average_ascend">Sort Ratings Average Ascending</Menu.Item>
      <Menu.Item key="ratings_average_descend">Sort Ratings Average Descending</Menu.Item>
    </Menu>
  );

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Author Name', dataIndex: 'author_name' },
    { title: 'First Publish Year', dataIndex: 'first_publish_year' },
    { title: 'Subject', dataIndex: 'subject' },
    { title: 'Ratings Average', dataIndex: 'ratings_average' },
    { title: 'Author Birth Date', dataIndex: 'author_birth_date' },
    { title: 'Author Top Work', dataIndex: 'author_top_work' },
  ];

  const csvHeaders = [
    {label: 'Title', key: 'title'},
    {label: 'Author Name', key: 'author_name' },
    { label: 'First Publish Year', key: 'first_publish_year' },
    { label: 'Subject', key: 'subject' },
    { label: 'Ratings Average', key: 'ratings_average' },
    { label: 'Author Birth Date', key: 'author_birth_date' },
    { label: 'Author Top Work', key: 'author_top_work' },
  ];

  if(!authentication){
    return <Login onLogin={handlelogin} />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 16px' }}>
        <Title level={2} style={{ color: '#fff', lineHeight: '64px', margin: 0 }}>
          Book Dashboard
        </Title>
      </Header>
      <Content style={{ margin: '16px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Input.Search
                placeholder="Search by author"
                onSearch={handleSearch}
                suffix={<SearchOutlined />}
                enterButton
                style={{ width: 300 }}
              />
            </Col>
            <Col>
              <Dropdown overlay={sortMenu} trigger={['click']}>
                <Button>
                  Sort Options <DownOutlined />
                </Button>
              </Dropdown>
              <Button style={{ marginLeft: 8 }} icon={<DownloadOutlined />}>
                <CSVLink data={books} headers={csvHeaders} filename={"books.csv"} style={{ color: 'inherit' }}>
                  Download CSV
                </CSVLink>
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={books}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            style={{ backgroundColor: '#fff', padding: '16px' }}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default Dashboard;
