// دالة لعرض المنتجات المخزنة
      function loadProducts() {
    const container = document.getElementById('productsContainer');
    const products = JSON.parse(localStorage.getItem('store_products')) || [];

    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">لا توجد منتجات معروضة حالياً.</p>';
        return;
    }

    container.innerHTML = '';
    products.forEach(product => {
        // الصورة الأولى هي الرئيسية للمنتج
        const mainImage = product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/250';
        
        // إعداد النجوم التقييمية للمتجر
        let starsHtml = '';
        if(product.rating > 0) {
            starsHtml = '<div style="color:#f59e0b; margin-bottom: 8px;">';
            for(let i=0; i<product.rating; i++) { starsHtml += '★'; }
            starsHtml += '</div>';
        }

        // إعداد عرض السعر حسب وجود الخصم أو عدمه
        let priceHtml = '';
        if(product.discount > 0) {
            priceHtml = `
                <div style="margin-bottom: 15px;">
                    <span style="text-decoration: line-through; color: #94a3b8; margin-left: 10px; font-size: 14px;">${product.originalPrice} درهم</span>
                    <span style="color: #ef4444; font-weight: bold; font-size: 18px;">${product.finalPrice} درهم</span>
                    <span style="background: #fee2e2; color: #ef4444; padding: 2px 6px; font-size: 12px; border-radius: 4px; margin-right: 5px;">خصم ${product.discount}%</span>
                </div>
            `;
        } else {
            priceHtml = `<div style="color: #27ae60; font-weight: bold; font-size: 18px; margin-bottom: 15px;">${product.originalPrice} درهم</div>`;
        }

        // حالة التوفر بالمخزن
        const isOutOfStock = product.stock <= 0;
        const btnHtml = isOutOfStock ? 
            `<button class="btn-buy" style="background:#cbd5e1; color:#64748b; cursor:not-allowed;" disabled>غير متوفر حالياً</button>` : 
            `<button class="btn-buy" onclick="orderProduct('${product.name}')">اشتري الآن</button>`;

        container.innerHTML += `
            <div class="product-card" style="${isOutOfStock ? 'opacity: 0.7;' : ''}">
                <img src="${mainImage}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    ${starsHtml}
                    ${priceHtml}
                    ${btnHtml}
                </div>
            </div>
        `;
    });
}

        function orderProduct(name) {
            alert(`شكراً لاهتمامك! تم تسجيل طلبك لمنتج: ${name}. (يمكنك ربط هذا الزر بواتساب لاحقاً)`);
        }

        // تشغيل الدالة عند تحميل الصفحة
        window.onload = loadProducts;
        // ... الكود القديم ديال السكريبت كيبقى هو هو، غتعوض غير هاد الأجزاء الخاصة بالأمان والتغيير:

// الكود السري الرئيسي المتفق عليه (الحماية ضد الغدر)
const MASTER_KEY = "adamadam123456anasianasi78910111213141516#{[|`\\^@";

// الحصول على كلمة السر الحالية للإدارة (الافتراضية هي admin123 يلا ما بدلوهاش)
function getAdminPassword() {
    return localStorage.getItem('admin_pass') || 'admin123';
}

function checkAdminPass() {
    const inputPass = document.getElementById('passInput').value;
    // يقدر يدخل بالكود السري الحالي أو بالكود الرئيسي ديالك نتا ديما
    if(inputPass === getAdminPassword() || inputPass === MASTER_KEY) {
        sessionStorage.setItem('proAdmin', 'true');
        showDashboard();
    } else { 
        alert("رمز الدخول غير صحيح! تفادى المحاولات العشوائية."); 
    }
}

// دالة تغيير كلمة المرور الذكية والمحمية بالكود الرئيسي
function changePassword() {
    // نطلبوا منهم يدخلوا الكود الرئيسي ديالك أولاً لتأكيد الهوية تفادياً للغدر
    const masterCheck = prompt("لحماية الملكية، يرجى إدخال الكود السري الرئيسي للمطور (Master Key):");
    
    if (masterCheck !== MASTER_KEY) {
        alert("⚠️ عذراً! الكود الرئيسي للمطور غير صحيح. لا يمكن تغيير إعدادات الأمان بدون إذن آدم!");
        return;
    }

    const newPass = document.getElementById('newAdminPass').value.trim();
    if(newPass.length < 4) {
        alert("الرجاء اختيار كلمة مرور مكونة من 4 أحرف أو أرقام على الأقل.");
        return;
    }
    
    localStorage.setItem('admin_pass', newPass);
    alert("🔒 تم تحديث رمز الإدارة بنجاح! الموقع الآن محمي ومأمن للمالك الجديد.");
    document.getElementById('newAdminPass').value = '';
    logoutAdmin();
}