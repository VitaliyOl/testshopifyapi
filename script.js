document
  .getElementById("courseForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const courseSelect = document.getElementById("courseSelect").value;
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value; 
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const phone = "+380968154894"; 
    
    let lineItems = [];
    if (courseSelect === "course1") {
      lineItems = [
        { variant_id: 45544775450882, quantity: 5 },
        { variant_id: 45544779448578, quantity: 1 },
      ];
    } else if (courseSelect === "course2") {
      lineItems = [
        { variant_id: 45544775450882, quantity: 4 },
        { variant_id: 45544780267778, quantity: 1 },
      ];
    } else if (courseSelect === "course3") {
      lineItems = [
        { variant_id: 45544775450882, quantity: 2 },
        { variant_id: 45544779448578, quantity: 1 },
        { variant_id: 45544780267778, quantity: 1 },
      ];
    }

    const orderData = {
      order: {
        line_items: lineItems,
        customer: {
          first_name: name,
          last_name: lastName,
          email: email,
          phone: phone,
        },
        shipping_address: {
          first_name: name,
          last_name: lastName,
          address1: address,
          city: "Ужгород",
          province: "Закарпаття",
          country: "UA",
          zip: "88000",
          province_code: "ZA",
          country_code: "UA",
        },
        financial_status: "paid",
      },
    };

    console.log("Order Data:", JSON.stringify(orderData, null, 2));

    const proxyUrl = "https://testshopifyserv.onrender.com/create-order";

    try {
      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      console.log("Response Status:", response.status);
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        document.getElementById("status").innerText =
          "Замовлення успішно оформлене!";
      } else {
        document.getElementById("status").innerText =
          "Помилка при оформленні замовлення.";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("status").innerText =
        "Сталася помилка під час відправки замовлення.";
    }
  });
