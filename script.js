document
  .getElementById("courseForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const courseSelect = document.getElementById("courseSelect").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
 
    const VITABISON_VARIANT_ID = 45544775450882;
    const NEUROVITA_VARIANT_ID = 45544779448578;
    const VITABOOST_VARIANT_ID = 45544780267778;

    console.log("Course selected:", courseSelect);
    console.log("Customer name:", name);
    console.log("Address:", address);
    console.log("Email:", email);
    
    let lineItems = [];
    if (courseSelect === "course1") {
      lineItems = [
        { variant_id: VITABISON_VARIANT_ID, quantity: 5 },
        { variant_id: NEUROVITA_VARIANT_ID, quantity: 1 },
      ];
    } else if (courseSelect === "course2") {
      lineItems = [
        { variant_id: VITABISON_VARIANT_ID, quantity: 4 },
        { variant_id: VITABOOST_VARIANT_ID, quantity: 1 },
      ];
    } else if (courseSelect === "course3") {
      lineItems = [
        { variant_id: VITABISON_VARIANT_ID, quantity: 2 },
        { variant_id: NEUROVITA_VARIANT_ID, quantity: 1 },
        { variant_id: VITABOOST_VARIANT_ID, quantity: 1 },
      ];
    }

    console.log("Line items:", lineItems);

 const orderData = {
   order: {
     line_items: lineItems, 
     customer: {
       first_name: name.split(" ")[0],
       last_name: name.split(" ")[1] || "",
       email: email,
       phone: "+380968745244",
     },
     shipping_address: {
       first_name: name.split(" ")[0],
       last_name: name.split(" ")[1] || "",
       address1: address,
       city: "Ужгород",
       country: "UA",
       zip: "88000",
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
