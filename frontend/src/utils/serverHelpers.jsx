const backendUrl="http://localhost:8000";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(backendUrl+route, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify(body),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(backendUrl+route, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
        },
        body : JSON.stringify(body),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route) => {
    const token = localStorage.getItem('token');
    const response = await fetch(backendUrl+route, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
        },
    });

    const formattedResponse = await response.json();
    return formattedResponse;
};