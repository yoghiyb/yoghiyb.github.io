async function includeHTML() {
    const elements = document.querySelectorAll('[include-html]');
    for (const element of elements) {
        const file = element.getAttribute('include-html');
        if (file) {
            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`Gagal memuat ${file}: ${response.status}`);
                const content = await response.text();

                // Ganti elemen menggunakan outerHTML
                element.outerHTML = content;

                // Eksekusi script setelah elemen diganti
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;

                const scripts = tempDiv.querySelectorAll('script');
                scripts.forEach((script) => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}

// function includeHTML() {
//     const elements = document.querySelectorAll('[include-html]')

//     elements.forEach(async (el) => {
//         const file = el.getAttribute('include-html')
//         if (!file) return

//         try {
//             const response = await fetch(file)
//             if (!response.ok) throw new Error("Gagal memuat ${file}")
//             const content = await response.text()

//             console.log("cek content: ", content)
//             el.outerHTML = content

//             el.removeAttribute('include-html');
//         } catch(err) {
//             el.innerHTML = "Error memuat file"
//         }
//     })
// }
// //includeHTML()

document.addEventListener("DOMContentLoaded", () => {
    includeHTML();
})
