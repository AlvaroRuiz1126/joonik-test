const BASE_URL = 'https://api.joonik.com';

export const getTokenByEmail = async (email = '') => {
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

export const getTokenByPassword = async (password = '', bearerToken = '') => {
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