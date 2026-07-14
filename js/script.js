const SECRET_CODE = "1-9-2026"; // Thay đổi mã bí mật mở khóa tại đây

// Tự động kiểm tra tham số đường dẫn để mở khóa nhanh khi quét QR
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    // Tự động generate mã QR động hướng đến chính trang web này
    const currentUrl = window.location.href.split('?')[0];
    const qrImg = document.getElementById('qr-image');
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl + '?code=' + SECRET_CODE)}`;

    if (code && code.toUpperCase() === SECRET_CODE) {
        unlockGift();
    }
};

// Hàm kiểm tra mật khẩu thủ công
function checkPasscode() {
    const input = document.getElementById('passcode').value;
    if (input.toUpperCase() === SECRET_CODE) {
        unlockGift();
    } else {
        alert("Mã chưa chính xác rồi, thử lại xem nhé! 💖");
    }
}

// Hàm kích hoạt mở khóa
function unlockGift() {
    document.getElementById('login-screen').classList.add('hidden');
    
    // Bật nhạc nền
    const music = document.getElementById('bg-music');
    music.play().catch(e => console.log("Tính năng autoplay nhạc bị chặn. Hãy tương tác với trang web để phát nhạc."));

    // Khởi động pháo hoa rực rỡ
    startFireworks();
}

// Hiệu ứng mở/đóng bao thư
function toggleEnvelope(element) {
    element.classList.toggle('open');
    
    if (element.classList.contains('open')) {
        // Tạo pháo confetti nhỏ bắn nhẹ ra khi người dùng ấn mở thư
        confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.7 }
        });
    }
}

// Hàm vẽ pháo hoa
function startFireworks() {
    const duration = 15 * 1000; 
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            // Sau 15 giây đầu pháo hoa vẫn nổ nhưng thưa hơn
            confetti(Object.assign({}, defaults, { origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
            return;
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 300);

    // Người dùng click vào canvas trống để tự tạo pháo nổ theo ý muốn
    document.getElementById('fireworksCanvas').addEventListener('click', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        confetti({
            particleCount: 65,
            spread: 75,
            origin: { x: x, y: y }
        });
    });
}
