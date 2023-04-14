const Notification = ({ notification }) => {
  const style = {
    color: notification.type === 'alert' ? 'red' : 'blue',
    background: 'lightgrey',
    fontSize: 20,
    padding: 10,
    marginBottom: 10
  };

  if (notification.message === null) {
    return null;
  }

  return (
    <div id="notification" style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;
