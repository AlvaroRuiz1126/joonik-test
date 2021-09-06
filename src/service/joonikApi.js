const BASE_URL = 'https://api.joonik.com';

export const getTokenByEmail = async (email) => {
    const resp = await fetch(`${BASE_URL}/login/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });
    const data = await resp.json();

    return data;
};

export const getTokenByPassword = async (password, bearerToken) => {
    const resp = await fetch(`${BASE_URL}/login/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify({password})
    });
    const data = await resp.json();

    return data;
};

export const getPostsWithToken = async (token) => {
    const resp = await fetch(`${BASE_URL}/posts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await resp.json();
    
    return data;
};

export const addNewPost = async (token, title, content, img) => {
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('image', img);
    console.log(form);
    const resp = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
        body: form
    });
    const data = await resp.json();

    return data;
};