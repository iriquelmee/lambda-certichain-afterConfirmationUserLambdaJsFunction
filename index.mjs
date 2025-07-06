export const handler = async (event) => {
    const data = event.request.userAttributes;
  
    // modelo cognito
    const user = {
      userID: data.sub,
      name: data.name || '',
      email: data.email || '',
      nickname: data.nickname || '',
      perfil: data['custom:perfil'] || '',
      userTypeId: 'default',
      userSubTypeId: 'basic',
      status: 'active'
    };
  
    console.log("Usuario completo:", JSON.stringify(user));
  
    // modelo bff 
    const bffUserData = {
        name: user.nickname,
        status: user.status,
        userTypeId: user.userTypeId,
        userSubTypeId: user.userSubTypeId,
        userID: user.userID
    };
  
    const endpoint = 'http://certichaindata.ddns.net:8083/api/userdata';
  
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bffUserData)
      });
  
      const responseText = await res.text();
      console.log('Respuesta del BFF:', res.status, responseText);
    } catch (err) {
      console.error('Error al llamar al BFF:', err);
    }
  
    return event;
  };
