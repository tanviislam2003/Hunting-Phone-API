const loadPhone = async (searchText='13',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //  console.log(phones);
  dispalyPhones(phones, isShowAll);
};

const dispalyPhones = (phones, isShowAll) => {
  // console.log("is show all", isShowAll);

  // console.log(phones)
  const phonecontainer = document.getElementById("phone-container");

  phonecontainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    // 2:create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;
    // 3:set innerHTMl
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handelShowDetail('${phone.slug}')"class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                    `;
    // 4:append child

    phonecontainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
};
const handelShowDetail = async (id) => {
  // console.log("click show details", id);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
const data = await res.json();
  const phone= data.data;
  showPhoneDetails(phone)
};
const showPhoneDetails = (phone) =>{
   
  console.log(phone);
  const phoneName=document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;
  const showDetailContaioner =document.getElementById("show-detail-container");
  showDetailContaioner.innerHTML=`
  <img src="${phone.image}" alt=""/>
 <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
 <p><span>GPS:</span>${ phone?.others?.GPS ||'No GPS available'}</p>
 
  `
  

  show_details_modal.showModal();

}

const handelSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};
// const handelSearch2=() =>{
//   toggleLoadingSpinner(true);
//     const searchField=document.getElementById('search-field2');
//     const searchText=searchField.value;
//     loadPhone(searchText);
// }

loadPhone();
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
const handleShowAll = () => {
  handelSearch(true);
};
