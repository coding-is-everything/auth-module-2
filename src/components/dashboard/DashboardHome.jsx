import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  LinearProgress
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, users: 2400, orders: 2400 },
  { name: 'Feb', sales: 3000, users: 1398, orders: 2210 },
  { name: 'Mar', sales: 2000, users: 9800, orders: 2290 },
  { name: 'Apr', sales: 2780, users: 3908, orders: 2000 },
  { name: 'May', sales: 1890, users: 4800, orders: 2181 },
  { name: 'Jun', sales: 2390, users: 3800, orders: 2500 },
  { name: 'Jul', sales: 3490, users: 4300, orders: 2100 },
];

const pieData = [
  { name: 'Completed', value: 75, color: '#10b981' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Cancelled', value: 10, color: '#ef4444' },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', amount: '$125.00', status: 'shipped' },
  { id: '#ORD-002', customer: 'Jane Smith', amount: '$85.50', status: 'processing' },
  { id: '#ORD-003', customer: 'Robert Johnson', amount: '$210.00', status: 'delivered' },
  { id: '#ORD-004', customer: 'Emily Davis', amount: '$42.99', status: 'processing' },
  { id: '#ORD-005', customer: 'Michael Wilson', amount: '$156.75', status: 'delivered' },
];

const stats = [
  { 
    title: 'Total Revenue', 
    value: '$34,545', 
    change: '+12.5%', 
    isPositive: true,
    icon: <AttachMoneyIcon fontSize="large" sx={{ color: 'success.main' }} />,
    color: 'success'
  },
  { 
    title: 'Total Orders', 
    value: '1,235', 
    change: '+8.3%', 
    isPositive: true,
    icon: <ShoppingCartIcon fontSize="large" sx={{ color: 'info.main' }} />,
    color: 'info'
  },
  { 
    title: 'Active Users', 
    value: '2,543', 
    change: '-2.1%', 
    isPositive: false,
    icon: <PeopleIcon fontSize="large" sx={{ color: 'warning.main' }} />,
    color: 'warning'
  },
  { 
    title: 'Avg. Order Value', 
    value: '$85.20', 
    change: '+4.2%', 
    isPositive: true,
    icon: <TrendingUpIcon fontSize="large" sx={{ color: 'primary.main' }} />,
    color: 'primary'
  },
];

const DashboardHome = () => {
  const theme = useTheme();

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={theme.palette.text.primary}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${pieData[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'shipped':
        return <ShippingIcon color="info" fontSize="small" />;
      case 'processing':
        return <PendingIcon color="warning" fontSize="small" />;
      case 'cancelled':
        return <CancelIcon color="error" fontSize="small" />;
      default:
        return <PendingIcon color="action" fontSize="small" />;
    }
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 'calc(100vh - 64px - 32px)', /* Account for header and padding */
      pb: 4
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Box 
                      component="span" 
                      sx={{
                        ml: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: stat.isPositive ? 'success.main' : 'error.main',
                        fontSize: '0.875rem',
                      }}
                    >
                      {stat.isPositive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                      {stat.change}
                    </Box>
                  </Box>
                </Box>
                <Avatar 
                  sx={{ 
                    bgcolor: `${stat.color}.light`, 
                    color: `${stat.color}.dark`,
                    width: 48, 
                    height: 48,
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Box>
              <Box mt={1}>
                <LinearProgress 
                  variant="determinate" 
                  value={75} 
                  color={stat.color}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              height: '100%',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" component="h2">
                Revenue Overview
              </Typography>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Last 7 days
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" name="Sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" name="Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" component="h2" mb={3}>
              Order Status
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: 300, position: 'relative' }}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            <Box mt={2}>
              {pieData.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: item.color,
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {item.name}: {item.value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              height: '100%',
            }}
          >
            <Typography variant="h6" component="h2" mb={3}>
              User Growth
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    name="Active Users" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" component="h2">
                Recent Orders
              </Typography>
              <Typography 
                variant="body2" 
                color="primary" 
                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                View All
              </Typography>
            </Box>
            <List disablePadding sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem 
                    disablePadding 
                    sx={{ 
                      py: 1.5, 
                      '&:hover': { 
                        backgroundColor: 'action.hover',
                        borderRadius: 1,
                      } 
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {getStatusIcon(order.status)}
                    </ListItemIcon>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">
                        {order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.customer}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                      {order.amount}
                    </Typography>
                  </ListItem>
                  {index < recentOrders.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
