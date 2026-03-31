const baseUrl = "http://127.0.0.1:8000/api";

async function testOrders() {
    try {
        const loginRes = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ email: "admin@admin.com", password: "password" })
        });
        const loginData = await loginRes.json();
        const token = loginData.access_token || loginData.token;
        
        console.log("Logged in. Testing /requests");
        let res = await fetch(`${baseUrl}/requests`, {
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        if(res.ok) console.log("/requests works:", await res.json());
        else console.log("/requests failed:", res.status);
        
        console.log("Testing /orders");
        res = await fetch(`${baseUrl}/orders`, {
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        if(res.ok) console.log("/orders works:", await res.json());
        else console.log("/orders failed:", res.status);
    } catch(e) {
        console.error(e);
    }
}
testOrders();
