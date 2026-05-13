import type { Scenario } from '../types/game';

export const scenarios: Scenario[] = [
            {
                id: "stage_1_1",
                stage: 1,
                stageTitle: "Stage 1.1: Suspicious Attachment",
                title: "File Pembaruan Teknis",
                context: "Kapal Anda akan segera bersandar di pelabuhan tujuan.",
                scenarioText: "Staf operasional menerima email dari vendor maintenance pelabuhan. Email tersebut terlihat mendesak dan meminta Anda membuka lampiran bernama 'Technical_Update_2026.pdf.exe' sebelum kapal tiba. Email menyebutkan bahwa proses clearance kapal dapat tertunda jika dokumen tidak segera dibuka dan diproses.",
                question: "Apa tindakan paling tepat yang harus Anda lakukan?",
                tags: ["Phishing", "Email Security", "Malware"],
                frameworkFunction: "Detect",
                trainerPoints: ["Jelaskan bahaya tersembunyi dari ekstensi ganda (.pdf.exe) yang menipu mata pengguna.", "Diskusikan SOP pelaporan email mencurigakan kepada tim IT di perusahaan Anda."],
                options: [
                    {
                        id: "s1_1_optA",
                        label: "Membuka file tersebut segera karena urgensi clearance pelabuhan sangat penting.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Lampiran tersebut memiliki ekstensi ganda (.pdf.exe). Ini adalah trik umum untuk menyembunyikan file Executable (program/malware) agar terlihat seperti PDF. Membukanya dapat langsung menginfeksi komputer operasional dengan malware atau ransomware.",
                        scoreDelta: { security: -20, operation: -10, compliance: -10, recovery: -5 },
                        recommendedAction: "Perhatikan selalu ekstensi asli file. Jika file berakhiran .exe, .bat, atau .vbs dari sumber yang tidak diverifikasi, jangan pernah diklik."
                    },
                    {
                        id: "s1_1_optB",
                        label: "Meneruskan (forward) email tersebut ke rekan kerja untuk meminta mereka mengecek file tersebut.",
                        feedbackType: "risky",
                        explanation: "Berisiko Tinggi! Meneruskan email berbahaya justru memperluas permukaan ancaman (threat surface). Rekan Anda mungkin tidak sadar dan tanpa sengaja mengklik file tersebut, sehingga menginfeksi jaringan dari perangkat lain.",
                        scoreDelta: { security: -10, operation: -5, compliance: -5, recovery: 0 },
                        recommendedAction: "Jangan pernah meneruskan email mencurigakan kepada staf non-IT."
                    },
                    {
                        id: "s1_1_optC",
                        label: "Membalas email tersebut untuk bertanya dan meminta konfirmasi apakah file ini aman.",
                        feedbackType: "risky",
                        explanation: "Berisiko! Membalas email phishing mengonfirmasi kepada penyerang bahwa alamat email Anda aktif dan dipantau. Penyerang akan terus membalas dengan rekayasa sosial agar Anda percaya dan akhirnya membuka file tersebut.",
                        scoreDelta: { security: -5, operation: 0, compliance: 0, recovery: 0 },
                        recommendedAction: "Hindari berinteraksi dengan pengirim email yang terindikasi mencurigakan."
                    },
                    {
                        id: "s1_1_optD",
                        label: "Tidak membuka lampiran, melaporkan email ke tim IT/Security, dan menghapusnya.",
                        feedbackType: "good",
                        explanation: "Tindakan Sempurna! Anda berhasil mengenali indikator phishing (urgency/kepanikan palsu dan lampiran .exe). Melaporkannya ke tim IT memungkinkan mereka memblokir pengirim tersebut di seluruh jaringan perusahaan.",
                        scoreDelta: { security: +15, operation: +5, compliance: +10, recovery: +0 },
                        recommendedAction: "Pertahankan kewaspadaan dan selalu gunakan fitur 'Report Phishing' jika tersedia di aplikasi email Anda."
                    }
                ]
            },
            {
                id: "stage_1_2",
                stage: 1,
                stageTitle: "Stage 1.2: Lookalike Domain",
                title: "Perubahan Rekening Agen Logistik",
                context: "Anda sedang mengurus administrasi pembayaran untuk pengiriman kargo (freight forwarding).",
                scenarioText: "Anda menerima invoice dari agen resmi langganan Anda, PT Maritime Logistics. Namun jika diperhatikan dengan teliti, alamat email pengirim adalah 'finance@maritine-logistics.com' (huruf 'n' menggantikan 'm', dan ada tanda hubung). Email ini mendesak pembayaran ke nomor rekening baru dengan alasan sistem perbankan lama sedang error.",
                question: "Bagaimana Anda menyikapi instruksi pembayaran ini?",
                tags: ["BEC", "Vendor Impersonation", "Fraud"],
                frameworkFunction: "Protect",
                trainerPoints: ["Diskusikan konsep 'Lookalike Domain' (Typosquatting) yang sering mengecoh saat staf sedang sibuk.", "Tekankan aturan wajib untuk melakukan verifikasi via telepon (Out-of-band) terkait pembayaran."],
                options: [
                    {
                        id: "s1_2_optA",
                        label: "Menghubungi agen melalui nomor telepon resmi yang sudah Anda simpan sebelumnya untuk memverifikasi rekening.",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! Anda telah menggagalkan serangan Business Email Compromise (BEC). Penipu sering menggunakan 'lookalike domain' (typosquatting) yang hampir mirip dengan aslinya. Memverifikasi instruksi finansial lewat jalur komunikasi berbeda (out-of-band) adalah prosedur keamanan terbaik.",
                        scoreDelta: { security: +15, operation: +10, compliance: +15, recovery: +0 },
                        recommendedAction: "Selalu lakukan verifikasi telepon langsung untuk setiap permintaan perubahan informasi rekening bank."
                    },
                    {
                        id: "s1_2_optB",
                        label: "Segera memproses pembayaran karena takut mengganggu kelancaran jadwal logistik kapal.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Anda telah menjadi korban Vendor Impersonation. Dana perusahaan akan dikirim ke rekening penyerang. Mengabaikan pengecekan domain email (maritine vs maritime) demi kecepatan operasi berakibat pada kerugian finansial yang besar.",
                        scoreDelta: { security: -20, operation: -20, compliance: -20, recovery: -10 },
                        recommendedAction: "Periksa selalu domain pengirim (terutama jika SPF/DMARC fail atau alamat terlihat aneh) sebelum transaksi finansial."
                    },
                    {
                        id: "s1_2_optC",
                        label: "Membalas email tersebut dengan meminta surat pernyataan resmi perubahan rekening perusahaan.",
                        feedbackType: "risky",
                        explanation: "Berisiko! Penipu profesional dengan mudah memalsukan kop surat, stempel, dan tanda tangan digital dalam format PDF. Meminta dokumen via rantai email penipu tidak membuktikan validitasnya.",
                        scoreDelta: { security: -10, operation: -5, compliance: -5, recovery: 0 },
                        recommendedAction: "Verifikasi dokumen tidak boleh melalui jalur komunikasi (email) yang sedang dicurigai telah disusupi."
                    },
                    {
                        id: "s1_2_optD",
                        label: "Menyimpan email tersebut tanpa melakukan pembayaran dan menunggu sampai agen menelepon untuk menagih.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Meskipun Anda mencegah kerugian uang saat ini, inaction (tidak bertindak) bisa mengganggu operasional riil jika ternyata memang ada kendala administrasi. Lebih baik bersikap proaktif untuk klarifikasi.",
                        scoreDelta: { security: 0, operation: -10, compliance: 0, recovery: 0 },
                        recommendedAction: "Budayakan pelaporan dini. Laporkan anomali kepada atasan dan pihak terkait secepat mungkin."
                    }
                ]
            },
            {
                id: "stage_1_3",
                stage: 1,
                stageTitle: "Stage 1.3: False Urgency",
                title: "Ancaman Denda Otoritas Pelabuhan",
                context: "Kapal sedang dalam perjalanan masuk (Port Approach) ke area pelabuhan sibuk.",
                scenarioText: "Kapten menerima email dari entitas yang mengaku sebagai Otoritas Pelabuhan (Port Authority). Subjek email: 'URGENT: Perubahan Regulasi Sandar'. Email tersebut mengancam denda sebesar $10,000 dan penundaan sandar jika Kapten tidak segera mengklik tautan untuk mengisi formulir kepatuhan online dalam waktu 30 menit.",
                question: "Apa langkah terbaik bagi kru dan Kapten kapal?",
                tags: ["Social Engineering", "Phishing", "Incident Response"],
                frameworkFunction: "Respond",
                trainerPoints: ["Jelaskan cara kerja manipulasi psikologis yang memanfaatkan rasa takut (False Urgency).", "Ingatkan kembali protokol standar komunikasi kapal-ke-pelabuhan (melalui Agen/Radio VHF)."],
                options: [
                    {
                        id: "s1_3_optA",
                        label: "Segera mengklik tautan dan mengisi data kapal dengan cepat agar terhindar dari denda dan delay.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Anda terkena taktik manipulasi psikologis (Social Engineering) berbasis ketakutan. Tautan tersebut kemungkinan mengarah ke situs kredensial palsu (credential harvesting) atau memicu unduhan malware otomatis.",
                        scoreDelta: { security: -25, operation: -15, compliance: -10, recovery: -5 },
                        recommendedAction: "Abaikan rasa panik. Otoritas resmi maritim jarang menggunakan ancaman instan 30 menit melalui tautan eksternal email tanpa komunikasi radio atau agen darat."
                    },
                    {
                        id: "s1_3_optB",
                        label: "Mengklik tautan tersebut hanya untuk mengecek seperti apa bentuk formulirnya, namun tidak mengisinya.",
                        feedbackType: "risky",
                        explanation: "Sangat Berisiko! Hanya dengan mengklik tautan jahat, komputer Anda bisa terinfeksi melalui metode 'Drive-by Download', atau penyerang dapat mencuri token sesi peramban (browser) Anda tanpa perlu Anda mengetik apa pun.",
                        scoreDelta: { security: -15, operation: -5, compliance: -5, recovery: 0 },
                        recommendedAction: "Jangan pernah mengklik tautan atau 'Hover' (mengarahkan kursor) untuk melihat tujuan asli URL jika Anda meragukannya."
                    },
                    {
                        id: "s1_3_optC",
                        label: "Meneruskan email peringatan tersebut ke perwira lain agar mereka juga waspada terhadap regulasi baru.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Meneruskan informasi yang belum diverifikasi berpotensi menyebarkan kepanikan palsu di kapal. Selain itu, ada kemungkinan perwira lain justru akan mengklik tautan tersebut.",
                        scoreDelta: { security: -5, operation: -10, compliance: 0, recovery: 0 },
                        recommendedAction: "Kendalikan arus informasi insiden. Isolasi email tersebut dan lakukan verifikasi silang secara terpusat."
                    },
                    {
                        id: "s1_3_optD",
                        label: "Abaikan urgensi email tersebut. Verifikasi kebenaran regulasi melalui Radio VHF atau Agen Kapal di darat.",
                        feedbackType: "good",
                        explanation: "Respons yang Sempurna! Menolak terpancing oleh taktik 'False Urgency' dan menggunakan saluran komunikasi operasional standar maritim (Radio VHF/Agen) adalah cara terbaik menetralisir rekayasa sosial siber.",
                        scoreDelta: { security: +15, operation: +10, compliance: +15, recovery: +5 },
                        recommendedAction: "Terus bangun budaya skeptisisme yang sehat (Healthy Skepticism) di antara kru kapal."
                    }
                ]
            },
            {
                id: "stage_2_1",
                stage: 2,
                stageTitle: "Stage 2.1: Critical Asset Selection",
                title: "Prioritas Aset Operasional",
                context: "Kapal kargo sedang bersiap untuk proses muat barang (loading) di pelabuhan.",
                scenarioText: "Sebagai staf yang memahami manajemen risiko, Anda diminta untuk mengidentifikasi aset mana yang paling kritikal. Jika aset ini mengalami *downtime* (mati/tidak berfungsi) akibat serangan siber, proses muat barang akan langsung terhenti secara fisik.",
                question: "Dari pilihan aset berikut, mana yang memiliki prioritas pelindungan tertinggi (Paling Kritikal)?",
                tags: ["Asset Identification", "Criticality", "OT Security"],
                frameworkFunction: "Identify",
                trainerPoints: ["Diskusikan perbedaan prioritas antara aset bisnis IT (administratif) dan aset OT (operasional/fisik).", "Tekankan pentingnya melakukan Business Impact Analysis (BIA) sebelum membeli alat keamanan."],
                options: [
                    {
                        id: "s2_1_optA",
                        label: "Jaringan Wi-Fi Kru (Crew Wi-Fi) di area istirahat.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Wi-Fi Kru penting untuk moral dan kesejahteraan kru, namun matinya sistem ini tidak akan secara langsung menghentikan proses operasional muat kargo.",
                        scoreDelta: { security: 0, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Fokuskan sumber daya utama pada aset yang berhubungan langsung dengan keselamatan dan fungsi inti (OT)."
                    },
                    {
                        id: "s2_1_optB",
                        label: "File Server HR dan Administrasi Umum (IT).",
                        feedbackType: "risky",
                        explanation: "Berisiko. Kehilangan akses ke dokumen HR merepotkan secara administratif, namun kapal masih bisa memuat kargo tanpa sistem HR untuk sementara waktu.",
                        scoreDelta: { security: 0, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Bedakan antara aset pendukung administrasi dan aset kritikal operasional."
                    },
                    {
                        id: "s2_1_optC",
                        label: "Jaringan Wi-Fi Penumpang (Passenger Wi-Fi) untuk menjaga reputasi layanan.",
                        feedbackType: "dangerous",
                        explanation: "Berbahaya jika Anda memprioritaskan aset ini! Mengutamakan anggaran keamanan siber untuk melindungi Wi-Fi hiburan dibanding sistem kemudi/kargo adalah kesalahan alokasi risiko yang bisa berdampak pada keselamatan fisik.",
                        scoreDelta: { security: -10, operation: -10, compliance: -5, recovery: 0 },
                        recommendedAction: "Lakukan Business Impact Analysis (BIA) untuk mengetahui sistem mana yang berdampak langsung pada operasi kritikal kapal."
                    },
                    {
                        id: "s2_1_optD",
                        label: "Sistem Dokumen Kargo (Loadicator) dan Sistem Monitoring Onboard (OT).",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! Sistem Loadicator (menghitung stabilitas kapal) dan monitoring OT adalah aset mahakritikal. Jika diretas atau dienkripsi, kapal tidak bisa memuat barang dengan aman dan bisa terancam bahaya fisik.",
                        scoreDelta: { security: +10, operation: +15, compliance: +10, recovery: +5 },
                        recommendedAction: "Pastikan sistem OT dan Data Kargo masuk ke dalam Tier 1 pada daftar prioritas pemulihan (Disaster Recovery)."
                    }
                ]
            },
            {
                id: "stage_2_2",
                stage: 2,
                stageTitle: "Stage 2.2: Asset Categorization",
                title: "Pemetaan Aset Kapal",
                context: "Tim audit keamanan (Compliance) meminta Anda mengelompokkan aset-aset yang ada di kapal agar perlindungannya tepat sasaran.",
                scenarioText: "Anda diberikan daftar aset: Firewall, Sistem Monitoring Onboard, dan Data Manifest Kargo. Pengelompokan jenis aset yang salah dapat menyebabkan penerapan kontrol keamanan yang tidak sesuai standar industri (seperti IEC 62443).",
                question: "Manakah pemetaan kategori aset berikut yang paling tepat?",
                tags: ["Asset Management", "IT vs OT", "Compliance"],
                frameworkFunction: "Identify",
                trainerPoints: ["Jelaskan mengapa salah mengkategorikan aset (misal: mesin OT di-treat seperti PC IT) bisa berbahaya.", "Diskusikan kewajiban memiliki Asset Inventory yang akurat sesuai standar regulasi."],
                options: [
                    {
                        id: "s2_2_optA",
                        label: "Firewall (Aset Network), Sistem Monitoring (Aset OT), Data Manifest (Aset Data).",
                        feedbackType: "good",
                        explanation: "Sangat Tepat! Firewall mengontrol jaringan (Network), Sistem Monitoring mengontrol fisik (OT - Operational Technology), dan Manifest adalah informasi (Data). Pemetaan ini memudahkan penerapan kontrol yang spesifik.",
                        scoreDelta: { security: +15, operation: +5, compliance: +15, recovery: +5 },
                        recommendedAction: "Selalu pelihara daftar aset (Asset Inventory) yang terklasifikasi dengan jelas antara IT, OT, Network, dan Data."
                    },
                    {
                        id: "s2_2_optB",
                        label: "Firewall (Aset Data), Sistem Monitoring (Aset Third Party), Data Manifest (Aset OT).",
                        feedbackType: "risky",
                        explanation: "Berisiko karena pemetaan ini kacau. Data Manifest bukanlah mesin fisik (OT), dan Firewall bukan sekadar data. Klasifikasi yang salah membuat tim IT salah menerapkan proteksi.",
                        scoreDelta: { security: -10, operation: -5, compliance: -10, recovery: 0 },
                        recommendedAction: "Gunakan panduan standar seperti NIST atau ISO 27001 untuk mengenali tipe-tipe aset."
                    },
                    {
                        id: "s2_2_optC",
                        label: "Anggap saja semuanya Aset IT (Information Technology) agar lebih mudah dikelola oleh satu tim.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Mengamankan aset OT (seperti mesin kapal) dengan cara yang sama seperti komputer IT (misalnya: auto-update saat sedang berlayar) dapat menyebabkan mesin kapal mati mendadak.",
                        scoreDelta: { security: -20, operation: -15, compliance: -15, recovery: -10 },
                        recommendedAction: "Pahami perbedaan mendasar IT (prioritas kerahasiaan) dan OT (prioritas ketersediaan dan keselamatan fisik)."
                    },
                    {
                        id: "s2_2_optD",
                        label: "Firewall (Aset OT), Sistem Monitoring (Aset Network), Data Manifest (Aset Third Party).",
                        feedbackType: "risky",
                        explanation: "Berisiko. Firewall adalah perangkat jaringan (Network), bukan sistem kontrol operasional fisik (OT). Kesalahan ini akan membingungkan vendor maintenance.",
                        scoreDelta: { security: -5, operation: -5, compliance: -10, recovery: 0 },
                        recommendedAction: "Pelajari arsitektur jaringan kapal dan fungsi setiap perangkat keras yang terpasang."
                    }
                ]
            },
            {
                id: "stage_2_3",
                stage: 2,
                stageTitle: "Stage 2.3: Assess the Vulnerability",
                title: "Risiko Akses Vendor 24/7",
                context: "Kapal Anda menggunakan VPN Vendor untuk pemeliharaan sistem mesin secara remote.",
                scenarioText: "Saat melakukan evaluasi, Anda menemukan bahwa akun VPN milik vendor (Third Party) ternyata berstatus 'Aktif Permanen' (24/7) dan HANYA menggunakan password biasa tanpa lapisan keamanan tambahan (MFA/2FA).",
                question: "Berdasarkan rumusan 'Risk = Asset + Threat + Vulnerability + Impact', pernyataan risiko apa yang paling tepat untuk situasi ini?",
                tags: ["Risk Assessment", "Vendor VPN", "MFA", "Vulnerability"],
                frameworkFunction: "Identify",
                trainerPoints: ["Diskusikan perbedaan kerentanan (password lemah) dan ancaman (hacker/malware).", "Jelaskan bahaya serangan rantai pasok (Supply Chain Attack) via vendor."],
                options: [
                    {
                        id: "s2_3_optA",
                        label: "Tidak ada risiko karena vendor tersebut adalah perusahaan maritim global yang sangat terpercaya.",
                        feedbackType: "risky",
                        explanation: "Berisiko Tinggi! Kepercayaan (Trust) bukanlah kontrol keamanan. Serangan rantai pasok (Supply Chain Attack) sering terjadi justru dengan membajak akun vendor terpercaya yang keamanannya lemah.",
                        scoreDelta: { security: -15, operation: 0, compliance: -10, recovery: 0 },
                        recommendedAction: "Terapkan prinsip 'Zero Trust'. Selalu verifikasi dan amankan akses, tidak peduli seberapa besar reputasi vendor tersebut."
                    },
                    {
                        id: "s2_3_optB",
                        label: "VPN vendor akan membuat kuota internet VSAT kapal cepat habis dan koneksi menjadi lambat.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Itu adalah masalah performa/biaya operasi, bukan definisi Risiko Siber utama dari ketiadaan otentikasi ganda (MFA).",
                        scoreDelta: { security: -5, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Fokus pada risiko keamanan data dan sistem, bukan hanya sekadar isu bandwith internet."
                    },
                    {
                        id: "s2_3_optC",
                        label: "Biarkan saja karena mengaktifkan MFA akan membuat teknisi vendor repot saat keadaan darurat.",
                        feedbackType: "dangerous",
                        explanation: "Berbahaya! Mengorbankan keamanan esensial (MFA pada akses remote) demi kenyamanan adalah celah terbesar dalam insiden siber modern.",
                        scoreDelta: { security: -20, operation: -10, compliance: -15, recovery: -5 },
                        recommendedAction: "Akses remote (VPN) KE WAJIBKAN menggunakan Multi-Factor Authentication (MFA) sesuai standar IACS UR E27."
                    },
                    {
                        id: "s2_3_optD",
                        label: "Ketiadaan MFA (Vulnerability) pada VPN (Aset) dapat dibajak hacker (Threat) untuk masuk ke jaringan, melumpuhkan kapal (Impact).",
                        feedbackType: "good",
                        explanation: "Sangat Tepat! Ini adalah perumusan risiko yang sempurna. Kontrol yang direkomendasikan: Nonaktifkan akun saat tidak dipakai, nyalakan hanya saat ada izin (Just-in-Time Access), dan WAJIBKAN MFA.",
                        scoreDelta: { security: +15, operation: +10, compliance: +15, recovery: +5 },
                        recommendedAction: "Implementasikan kontrol JIT (Just-In-Time) Access dan MFA untuk semua koneksi dari pihak ketiga."
                    }
                ]
            },
            {
                id: "stage_2_4",
                stage: 2,
                stageTitle: "Stage 2.4: Formulate the Risk",
                title: "Menuliskan Pernyataan Risiko",
                context: "Sebagai bagian dari pelaporan ke manajemen pusat, Anda harus merangkum sebuah insiden yang baru terjadi di kapal lain di armada Anda.",
                scenarioText: "Informasi insiden: Server Backup (Aset) terkena Ransomware karena salah satu staf membiarkan port Remote Desktop Protocol (RDP) terbuka langsung ke internet (tanpa Firewall/VPN). Akibatnya, seluruh data kapal tidak bisa dipulihkan.",
                question: "Manakah rumusan masalah (Risk Statement) yang paling akurat merepresentasikan kejadian tersebut?",
                tags: ["Risk Statement", "Ransomware", "Configuration"],
                frameworkFunction: "Govern",
                trainerPoints: ["Ajarkan cara membuat pernyataan risiko yang konstruktif untuk dewan direksi.", "Hindari budaya menyalahkan (blaming culture); fokus pada akar masalah miskonfigurasi."],
                options: [
                    {
                        id: "s2_4_optA",
                        label: "Ransomware berhasil masuk ke kapal karena kru kapal suka membuka internet sembarangan untuk hiburan.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Pernyataan ini bersifat menyalahkan (blaming) secara general, tanpa mengidentifikasi kerentanan spesifik (Vulnerability) yang disebutkan dalam laporan, yaitu port RDP yang terbuka.",
                        scoreDelta: { security: -5, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Pernyataan risiko harus objektif, spesifik, dan berbasis pada akar masalah teknis/proses, bukan sekadar asumsi."
                    },
                    {
                        id: "s2_4_optB",
                        label: "Server backup rusak sehingga data penting kapal hilang selamanya.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Pernyataan ini hanya menyebutkan Dampak (Impact), tetapi kehilangan komponen Ancaman (Threat) dan Kerentanan (Vulnerability).",
                        scoreDelta: { security: -5, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Pernyataan yang baik harus menjelaskan 'Mengapa' dan 'Bagaimana' dampak itu bisa terjadi."
                    },
                    {
                        id: "s2_4_optC",
                        label: "Tim IT sangat buruk karena tidak memasang antivirus yang mahal sehingga ransomware bisa masuk.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Selain menyalahkan tim sendiri tanpa bukti, ini adalah pemahaman kontrol yang dangkal. Antivirus termahal pun tidak akan efektif jika kerentanan fatal seperti RDP yang terbuka ke publik dibiarkan (Misconfiguration).",
                        scoreDelta: { security: -15, operation: -10, compliance: -10, recovery: -5 },
                        recommendedAction: "Keamanan bukan hanya tentang membeli alat mahal, tapi tentang konfigurasi yang aman (Secure Configuration)."
                    },
                    {
                        id: "s2_4_optD",
                        label: "Port RDP yang terbuka (Vulnerability) dimanfaatkan penyerang (Threat) untuk mengenkripsi Backup Server (Asset), mencegah pemulihan data (Impact).",
                        feedbackType: "good",
                        explanation: "Sempurna! Rumusan risiko yang merangkum komponen Asset, Threat, Vulnerability, dan Impact secara logis. Kontrol yang direkomendasikan: Tutup port RDP dari publik, letakkan di belakang VPN, dan pisahkan server backup dari jaringan utama.",
                        scoreDelta: { security: +15, operation: +5, compliance: +15, recovery: +10 },
                        recommendedAction: "Gunakan format rumusan risiko ini saat membuat Laporan Penilaian Risiko Siber (Cyber Risk Assessment) kepada manajemen."
                    }
                ]
            },
            {
                id: "stage_3_1",
                stage: 3,
                stageTitle: "Stage 3.1: New Build Resilience",
                title: "Standar Kapal Baru",
                context: "Perusahaan sedang merancang pembangunan armada kapal baru (newbuild) di galangan.",
                scenarioText: "Regulator dan pihak asuransi meminta kepastian bahwa rancangan arsitektur jaringan kapal secara keseluruhan (Ship-level Cyber Resilience) sudah aman terhadap serangan siber sebelum kapal berlayar. Standar spesifik maritim manakah yang paling tepat dijadikan acuan wajib?",
                question: "Standar apa yang fokus pada integrasi keamanan siber keseluruhan kapal?",
                tags: ["IACS UR E26", "Architecture", "Compliance"],
                frameworkFunction: "Protect",
                trainerPoints: ["Jelaskan sejarah kewajiban IACS UR E26 untuk kapal baru mulai 2024.", "Bedakan keamanan level perusahaan (Corporate) dengan keamanan arsitektur kapal (Ship-level)."],
                options: [
                    {
                        id: "s3_1_optA",
                        label: "ISO 27001",
                        feedbackType: "risky",
                        explanation: "Berisiko. ISO 27001 adalah standar manajemen keamanan informasi secara umum (biasanya untuk kantor di darat), namun kurang spesifik dalam mengatur arsitektur fisik operasional (OT) kapal.",
                        scoreDelta: { security: 0, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Gunakan standar manajemen umum bersamaan dengan regulasi teknis spesifik industri."
                    },
                    {
                        id: "s3_1_optB",
                        label: "IACS UR E26",
                        feedbackType: "good",
                        explanation: "Sangat Tepat! IACS UR E26 (Cyber resilience of ships) adalah regulasi wajib untuk kapal baru yang mengatur bagaimana semua sistem di kapal terintegrasi secara aman (Ship-level). Standar ini adalah jembatan antara IT dan OT maritim.",
                        scoreDelta: { security: +10, operation: +10, compliance: +15, recovery: +5 },
                        recommendedAction: "Pastikan galangan kapal menyertakan kepatuhan UR E26 dalam kontrak pembangunan."
                    },
                    {
                        id: "s3_1_optC",
                        label: "IACS UR E27",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. IACS UR E27 memang standar maritim, tetapi fokusnya adalah pada peralatan atau komponen individu (Onboard Systems/Equipment), bukan desain kapal secara keseluruhan.",
                        scoreDelta: { security: +5, operation: 0, compliance: 0, recovery: 0 },
                        recommendedAction: "Pahami perbedaan lingkup standar: E26 untuk integrasi kapal (Ship-level), E27 untuk pembuat alat (System-level)."
                    },
                    {
                        id: "s3_1_optD",
                        label: "Gunakan pendekatan fungsional; alokasikan anggaran langsung untuk beli Firewall & Antivirus termahal tanpa terikat standar.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Mengandalkan 'pembelian alat' tanpa kerangka arsitektur (arsitektur Ship-level) dan panduan kepatuhan akan menyebabkan integrasi yang berantakan, serta berpotensi ditolak berlayar oleh otoritas maritim.",
                        scoreDelta: { security: -15, operation: -10, compliance: -20, recovery: -5 },
                        recommendedAction: "Keamanan siber maritim modern wajib mematuhi standar kelas (Class Rules) seperti IACS."
                    }
                ]
            },
            {
                id: "stage_3_2",
                stage: 3,
                stageTitle: "Stage 3.2: Secure Equipment",
                title: "Pengadaan Alat Navigasi Baru",
                context: "Kapal akan memasang sistem Electronic Chart Display and Information System (ECDIS) model terbaru.",
                scenarioText: "Superintendent teknis meminta agar alat baru ini tidak menjadi celah masuk hacker. Alat tersebut diwajibkan memiliki fitur keamanan bawaan (Secure by Design), seperti: manajemen pengguna, pencatatan aktivitas (audit logging), pembaruan sistem yang aman, dan backup.",
                question: "Aturan maritim manakah yang mewajibkan vendor perangkat menyediakan fitur-fitur keamanan tersebut?",
                tags: ["IACS UR E27", "Vendor Requirement", "OT Security"],
                frameworkFunction: "Protect",
                trainerPoints: ["Diskusikan konsep 'Secure by Design' pada perangkat OT.", "Tekankan hak perusahaan kapal untuk menuntut kepatuhan UR E27 pada vendor dalam kontrak."],
                options: [
                    {
                        id: "s3_2_optA",
                        label: "IACS UR E26",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Seperti yang dipelajari sebelumnya, E26 fokus pada integrasi kapal secara keseluruhan (jaringan antar alat), bukan spesifikasi keamanan di dalam satu alat (ECDIS) itu sendiri.",
                        scoreDelta: { security: +5, operation: 0, compliance: 0, recovery: 0 },
                        recommendedAction: "Gunakan standar yang tepat saat menekan vendor/supplier pembuat alat bantu operasional."
                    },
                    {
                        id: "s3_2_optB",
                        label: "IACS UR E27",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! IACS UR E27 (Cyber resilience of on-board systems and equipment) secara spesifik menargetkan pembuat alat (vendor). Standar ini memaksa vendor untuk memastikan produk mereka memiliki kontrol keamanan bawaan yang Anda sebutkan.",
                        scoreDelta: { security: +15, operation: +10, compliance: +15, recovery: +5 },
                        recommendedAction: "Minta sertifikat kesesuaian (Type Approval) UR E27 dari vendor sebelum membeli peralatan IT/OT untuk kapal."
                    },
                    {
                        id: "s3_2_optC",
                        label: "IMO Maritime Cyber Risk Management",
                        feedbackType: "risky",
                        explanation: "Berisiko. Resolusi IMO ini adalah payung hukum umum untuk manajemen perusahaan agar memasukkan risiko siber ke ISM Code. Panduan ini tidak merinci detail spesifikasi teknis sebuah alat elektronik.",
                        scoreDelta: { security: 0, operation: -5, compliance: +5, recovery: 0 },
                        recommendedAction: "Panduan tingkat tinggi (High-level) membutuhkan aturan turunan teknis untuk eksekusi di lapangan."
                    },
                    {
                        id: "s3_2_optD",
                        label: "Biarkan vendor yang memutuskan fitur apa yang penting, karena mereka spesialisnya.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Banyak perangkat OT maritim dulunya didesain tanpa memikirkan keamanan siber (hanya fokus fungsional). Jika pembeli tidak menuntut fitur keamanan, alat tersebut akan jadi celah bagi kapal.",
                        scoreDelta: { security: -20, operation: -5, compliance: -15, recovery: -10 },
                        recommendedAction: "Pemilik kapal harus proaktif menentukan spesifikasi keamanan dalam proses pengadaan (Procurement)."
                    }
                ]
            },
            {
                id: "stage_3_3",
                stage: 3,
                stageTitle: "Stage 3.3: Show Me the Evidence",
                title: "Bukti Penerapan Kontrol Akses",
                context: "Auditor eksternal dari Port State Control (PSC) naik ke kapal untuk inspeksi keamanan siber rutin.",
                scenarioText: "Auditor tidak hanya ingin mendengar pernyataan bahwa kapal Anda memiliki 'Kontrol Akses' (Access Control) yang baik, tapi mereka menuntut bukti nyata (evidence) yang memvalidasi bahwa kebijakan itu benar-benar dijalankan.",
                question: "Dari pilihan berikut, mana yang merupakan bukti (evidence) paling valid untuk ditunjukkan kepada auditor?",
                tags: ["Evidence", "Audit", "Access Control"],
                frameworkFunction: "Govern",
                trainerPoints: ["Bedakan antara dokumen kebijakan (Policy) dan bukti pelaksanaan (Artifact).", "Diskusikan apa saja log yang dapat dijadikan amunisi lolos audit PSC."],
                options: [
                    {
                        id: "s3_3_optA",
                        label: "Dokumen Kebijakan (Cyber Security Policy) setebal 100 halaman bertanda tangan direktur.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Kebijakan (Policy) itu penting sebagai landasan niat perusahaan. Namun, dokumen kertas tidak membuktikan bahwa staf di lapangan benar-benar mempraktikkannya.",
                        scoreDelta: { security: 0, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Standar membutuhkan implementasi nyata, bukan sekadar 'macan kertas'."
                    },
                    {
                        id: "s3_3_optB",
                        label: "Report Tinjauan Akses (Access Review Report), Log Audit Pengguna, dan Bukti Penggunaan MFA.",
                        feedbackType: "good",
                        explanation: "Sangat Tepat! Auditor mencari 'Artifact' atau bukti teknis. Log audit yang menunjukkan siapa masuk kapan, hasil pencabutan akses mantan kru, dan penerapan otentikasi ganda (MFA) adalah bukti absolut bahwa sistem benar-benar terlindungi.",
                        scoreDelta: { security: +15, operation: +5, compliance: +20, recovery: +5 },
                        recommendedAction: "Biasakan menyimpan riwayat/log sistem operasional minimal selama 1 tahun untuk kebutuhan audit dan forensik."
                    },
                    {
                        id: "s3_3_optC",
                        label: "Menunjukkan bahwa pintu ruang kontrol mesin dan server (Server Room) selalu dikunci gembok.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Keamanan fisik itu penting, namun auditor siber sedang meminta bukti mengenai Logical Access Control (akses jaringan/aplikasi), bukan sekadar pintu ruangan.",
                        scoreDelta: { security: +5, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Keamanan siber adalah kombinasi kontrol fisik, logis/digital, dan administratif."
                    },
                    {
                        id: "s3_3_optD",
                        label: "Memberikan username dan password admin kepada auditor agar mereka bisa masuk dan mengecek sendiri.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Memberikan kredensial (password) admin kepada auditor luar adalah pelanggaran serius terhadap kerahasiaan dan standar compliance (termasuk ISO 27001).",
                        scoreDelta: { security: -25, operation: -10, compliance: -25, recovery: 0 },
                        recommendedAction: "Jangan pernah membagikan password admin. Gunakan fitur 'View Only' jika auditor perlu melihat sistem."
                    }
                ]
            },
            {
                id: "stage_3_4",
                stage: 3,
                stageTitle: "Stage 3.4: Practical Security Start",
                title: "Memulai Kontrol Dasar",
                context: "Manajemen menyadari bahwa infrastruktur IT/OT pelabuhan rentan, namun mereka memiliki anggaran dan staf IT yang terbatas.",
                scenarioText: "Alih-alih langsung mengejar sertifikasi tebal yang rumit, manajemen ingin segera menerapkan langkah-langkah teknis praktis yang terbukti paling efektif memblokir serangan ransomware umum, seperti inventarisasi aset, konfigurasi aman, dan pembaruan patch.",
                question: "Kerangka kerja (Framework) apa yang paling cocok dijadikan panduan 'To-Do List' praktis untuk memulai dari nol?",
                tags: ["CIS Controls", "Practical Security", "Baseline"],
                frameworkFunction: "Protect",
                trainerPoints: ["Jelaskan fungsi Implementation Groups (IG 1, 2, 3) dalam CIS Controls.", "Tekankan bahwa CIS Control nomor 1 & 2 (Inventarisasi) adalah fondasi segalanya."],
                options: [
                    {
                        id: "s3_4_optA",
                        label: "CIS Controls (Center for Internet Security)",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! CIS Controls adalah kumpulan aksi (best practices) teknis yang terprioritasi (Implementation Group 1, 2, 3). Ini sangat cocok sebagai daftar periksa (checklist) langsung jalan bagi tim teknis untuk membangun pertahanan dasar (cyber hygiene).",
                        scoreDelta: { security: +15, operation: +10, compliance: +10, recovery: +5 },
                        recommendedAction: "Mulai dari CIS Control 1 & 2: Pahami persis Perangkat Keras dan Perangkat Lunak apa saja yang Anda miliki di jaringan (Inventory)."
                    },
                    {
                        id: "s3_4_optB",
                        label: "ISO 27001",
                        feedbackType: "risky",
                        explanation: "Berisiko. Memulai dari nol langsung dengan ISO 27001 bisa terasa sangat berat karena fokus utamanya adalah proses audit, dokumentasi, dan sistem manajemen yang kompleks, bukan panduan teknis langsung.",
                        scoreDelta: { security: +5, operation: -10, compliance: +5, recovery: 0 },
                        recommendedAction: "Gunakan panduan teknis (seperti CIS) terlebih dahulu sebelum membungkusnya dalam sistem manajemen (ISO)."
                    },
                    {
                        id: "s3_4_optC",
                        label: "IMO Maritime Cyber Risk Management",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Aturan IMO menuntut kapal memiliki manajemen risiko siber, tetapi IMO tidak memberikan rincian teknis tentang bagaimana cara mengatur firewall atau patch komputer. Anda butuh standar teknis lain.",
                        scoreDelta: { security: +5, operation: -5, compliance: +5, recovery: 0 },
                        recommendedAction: "Integrasikan standar manajemen tinggi dengan standar kontrol operasional/teknis."
                    },
                    {
                        id: "s3_4_optD",
                        label: "Membeli software keamanan paling mahal dan meminta vendor mengurus semuanya.",
                        feedbackType: "dangerous",
                        explanation: "Berbahaya! Anda tidak bisa mengamankan apa yang tidak Anda pahami. Jika Anda tidak tahu aset Anda (CIS Control 1), software termahal pun akan salah dikonfigurasi dan tidak efektif.",
                        scoreDelta: { security: -15, operation: -5, compliance: -10, recovery: -5 },
                        recommendedAction: "Dasar keamanan siber adalah proses dan sumber daya manusia, bukan sekadar 'membeli teknologi'."
                    }
                ]
            },
            {
                id: "stage_3_5",
                stage: 3,
                stageTitle: "Stage 3.5: The Cyber Roadmap",
                title: "Menyusun Peta Jalan Keamanan",
                context: "Dewan direksi perusahaan pelayaran meminta laporan postur keamanan siber yang komprehensif, namun mudah dipahami oleh non-IT.",
                scenarioText: "Mereka meminta laporan tersebut dibagi menjadi 5 fase yang jelas: mengenali aset (Identify), memasang perlindungan (Protect), mendeteksi ancaman (Detect), merespons saat terjadi insiden (Respond), dan memulihkan operasi (Recover).",
                question: "Kerangka kerja (Framework) global manakah yang mempopulerkan struktur lima fase inti ini?",
                tags: ["NIST CSF", "Roadmap", "Strategy"],
                frameworkFunction: "Govern",
                trainerPoints: ["Diskusikan akronim IPDRR sebagai bahasa universal keamanan siber.", "Jelaskan mengapa dewan direksi lebih menyukai NIST CSF dibandingkan laporan metrik IT yang rumit."],
                options: [
                    {
                        id: "s3_5_optA",
                        label: "CIS Controls",
                        feedbackType: "risky",
                        explanation: "Berisiko. CIS sangat baik untuk 'aksi teknis', namun kurang tepat jika digunakan sebagai bahasa komunikasi tingkat tinggi (High-level) dengan dewan direksi yang menginginkan strategi holistik 5 fase.",
                        scoreDelta: { security: +5, operation: 0, compliance: 0, recovery: 0 },
                        recommendedAction: "Sesuaikan bahasa laporan dengan audiens; direksi butuh gambaran risiko strategis, staf IT butuh rincian teknis."
                    },
                    {
                        id: "s3_5_optB",
                        label: "Membuat standar buatan sendiri berdasarkan artikel di internet.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Menciptakan standar sendiri ('Security by Obscurity') justru akan membingungkan staf, menyulitkan audit eksternal, dan rentan kehilangan komponen kritikal.",
                        scoreDelta: { security: -15, operation: -10, compliance: -20, recovery: -10 },
                        recommendedAction: "Selalu adopsi standar kerangka kerja yang telah diakui secara internasional."
                    },
                    {
                        id: "s3_5_optC",
                        label: "NIST Cybersecurity Framework (NIST CSF)",
                        feedbackType: "good",
                        explanation: "Sempurna! NIST CSF dari Amerika Serikat adalah standar de-facto yang menyusun keamanan siber ke dalam 5 fungsi inti: Identify, Protect, Detect, Respond, Recover (IPDRR). IMO juga merekomendasikan pendekatan IPDRR ini dalam panduannya.",
                        scoreDelta: { security: +15, operation: +10, compliance: +15, recovery: +10 },
                        recommendedAction: "Gunakan NIST CSF Core Functions (IPDRR) sebagai bahasa universal untuk menjembatani komunikasi antara IT, Operasional, dan Manajemen Atas."
                    },
                    {
                        id: "s3_5_optD",
                        label: "IACS UR E27",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Sekali lagi, IACS UR E27 adalah aturan tentang spesifikasi perangkat/alat (Equipment), bukan tentang menyusun strategi keamanan siber level perusahaan (Corporate roadmap).",
                        scoreDelta: { security: 0, operation: -5, compliance: -5, recovery: 0 },
                        recommendedAction: "Pilih kerangka kerja yang sesuai dengan skala dan tujuan pelaporan Anda."
                    }
                ]
            },
            {
                id: "stage_4_1",
                stage: 4,
                stageTitle: "Stage 4.1: The Unknown Device",
                title: "Flashdisk Tertinggal",
                context: "Seorang kru menemukan USB flashdisk tergeletak di dekat area tangga naik (gangway) pelabuhan.",
                scenarioText: "Flashdisk tersebut tidak memiliki nama atau label apa pun. Beberapa kru penasaran apakah itu berisi dokumen penting kapal yang terjatuh, atau mungkin file pribadi.",
                question: "Sebagai staf yang sadar keamanan siber, apa instruksi paling tepat yang harus Anda berikan kepada kru tersebut?",
                tags: ["Physical Security", "Malware", "Social Engineering"],
                frameworkFunction: "Protect",
                trainerPoints: ["Diskusikan bahwa serangan siber bisa bermula dari pancingan fisik (Baiting).", "Jelaskan fasilitas Kiosk Scanner (komputer isolasi) jika memang butuh mengecek isi USB asing."],
                options: [
                    {
                        id: "s4_1_optA",
                        label: "Segera colokkan ke komputer administrasi pelabuhan untuk melihat isi file agar bisa dikembalikan ke pemiliknya.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Ini adalah taktik serangan fisik yang disebut 'USB Drop'. Penyerang sengaja menjatuhkan USB berisi malware. Saat dicolokkan, malware (seperti ransomware) otomatis menginfeksi sistem kapal/pelabuhan tanpa terhalang firewall luar.",
                        scoreDelta: { security: -25, operation: -10, compliance: -10, recovery: -5 },
                        recommendedAction: "Terapkan kebijakan larangan keras (Zero Tolerance) mencolokkan media USB tak dikenal ke komputer operasional."
                    },
                    {
                        id: "s4_1_optB",
                        label: "Colokkan USB tersebut ke laptop pribadi kru (bukan komputer kapal) untuk mengecek isinya dengan aman.",
                        feedbackType: "risky",
                        explanation: "Berisiko Tinggi. Meskipun sistem operasi kapal mungkin aman sementara, laptop pribadi kru akan terinfeksi. Jika laptop itu nantinya terhubung ke Wi-Fi internal kapal, malware bisa menyebar (Lateral Movement).",
                        scoreDelta: { security: -15, operation: -5, compliance: -5, recovery: 0 },
                        recommendedAction: "USB tidak dikenal berbahaya bagi perangkat apa pun, baik aset perusahaan maupun aset pribadi (BYOD)."
                    },
                    {
                        id: "s4_1_optC",
                        label: "Abaikan saja dan buang USB tersebut ke laut agar tidak ada yang bisa mengambilnya.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Meskipun Anda mencegah infeksi, membuangnya berarti Anda menghilangkan bukti intelijen ancaman (Threat Intelligence) yang berharga bagi tim keamanan IT.",
                        scoreDelta: { security: +5, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Anomali keamanan fisik di area pelabuhan harus dilaporkan, bukan diabaikan."
                    },
                    {
                        id: "s4_1_optD",
                        label: "Amankan USB tersebut tanpa mencolokkannya ke mana pun, lalu serahkan kepada Perwira IT/Security untuk diisolasi.",
                        feedbackType: "good",
                        explanation: "Tindakan Sempurna! Anda mencegah eksekusi malware sekaligus mengamankan bukti fisik. Tim IT nantinya dapat menganalisis USB tersebut di lingkungan terkendali yang terisolasi sepenuhnya (Sandbox).",
                        scoreDelta: { security: +15, operation: +5, compliance: +10, recovery: +0 },
                        recommendedAction: "Sediakan prosedur penanganan perangkat digital mencurigakan yang ditemukan di area operasional."
                    }
                ]
            },
            {
                id: "stage_4_2",
                stage: 4,
                stageTitle: "Stage 4.2: Convenient but Deadly",
                title: "Catatan Kredensial di Anjungan",
                context: "Anda sedang melakukan patroli rutin di ruang kemudi (anjungan).",
                scenarioText: "Anda melihat ada selembar 'sticky note' kuning tertempel di monitor Electronic Chart Display and Information System (ECDIS). Catatan itu bertuliskan 'Admin / P@ssw0rd2026' agar perwira shift malam mudah mengingat sandi saat harus update peta navigasi.",
                question: "Bagaimana Anda menanggapi temuan ini?",
                tags: ["Credential Theft", "Physical Security", "Insider Threat"],
                frameworkFunction: "Protect",
                trainerPoints: ["Jelaskan mengapa kemudahan (Convenience) seringkali menjadi musuh utama Keamanan (Security).", "Diskusikan prinsip Accountability (Akuntabilitas) saat menggunakan password pribadi vs password bersama."],
                options: [
                    {
                        id: "s4_2_optA",
                        label: "Mencabut catatan tersebut, merobeknya, dan melaporkan ke Kapten agar sandi admin segera diubah.",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! Kredensial yang terekspos secara fisik adalah kerentanan serius. Siapa saja (vendor, tamu, kru tak berwenang) bisa memanfaatkannya. Melaporkan agar sandi diubah (karena statusnya sudah bocor/compromised) adalah prosedur pelaporan insiden yang benar.",
                        scoreDelta: { security: +15, operation: +5, compliance: +15, recovery: +5 },
                        recommendedAction: "Hapus kebiasaan berbagi kredensial fisik. Gunakan akun individual untuk membedakan aktivitas (Audit Accountability)."
                    },
                    {
                        id: "s4_2_optB",
                        label: "Membiarkannya saja karena update peta navigasi di malam hari sangat mendesak dan tidak boleh terhambat karena lupa sandi.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Mengorbankan keamanan dasar demi kemudahan operasional. Jika auditor dari Port State Control (PSC) melihat hal ini, kapal bisa mendapat status teguran serius terkait regulasi siber maritim.",
                        scoreDelta: { security: -20, operation: -5, compliance: -20, recovery: -5 },
                        recommendedAction: "Kenyamanan tidak boleh mengorbankan keamanan akses pada sistem operasional kritis kapal (OT)."
                    },
                    {
                        id: "s4_2_optC",
                        label: "Memindahkan catatan tersebut ke dalam laci meja anjungan yang tak terkunci agar tidak terlihat langsung oleh orang luar.",
                        feedbackType: "risky",
                        explanation: "Sangat Berisiko. Menyembunyikan kata sandi (Security by Hiding) tidak efektif. Sandi itu secara esensial masih berupa teks polos (Plain text) dan berpotensi dicuri oleh ancaman internal (Insider Threat).",
                        scoreDelta: { security: -10, operation: 0, compliance: -10, recovery: 0 },
                        recommendedAction: "Kata sandi yang sudah terekspos harus dianggap hangus dan wajib diganti."
                    },
                    {
                        id: "s4_2_optD",
                        label: "Segera menghapus akun admin tersebut dari sistem secara sepihak agar tidak bisa digunakan lagi.",
                        feedbackType: "dangerous",
                        explanation: "Berbahaya secara Operasional! Menghapus akun admin utama tanpa koordinasi bisa menyebabkan sistem ECDIS terkunci total (Lockout), melumpuhkan navigasi fisik kapal.",
                        scoreDelta: { security: +5, operation: -25, compliance: -10, recovery: -15 },
                        recommendedAction: "Mitigasi keamanan tidak boleh dilakukan sepihak tanpa memahami dampaknya pada operasional alat kritis."
                    }
                ]
            },
            {
                id: "stage_4_3",
                stage: 4,
                stageTitle: "Stage 4.3: The Invisible Net",
                title: "Wi-Fi Terbuka Pelabuhan",
                context: "Kapal Anda sedang bersandar di terminal pelabuhan umum (Public Port).",
                scenarioText: "Koneksi satelit (VSAT) internal kapal sedang gangguan. Di saat bersamaan, agen logistik mendesak pengiriman soft-copy dokumen manifest kargo via email. Muncul jaringan Wi-Fi tidak dikunci (tanpa password) di daftar jaringan, bernama 'Port_Terminal_WiFi_Free'.",
                question: "Keputusan operasional apa yang paling seimbang antara keamanan dan kecepatan pengiriman dokumen?",
                tags: ["Network Security", "Public Wi-Fi", "Data Protection"],
                frameworkFunction: "Protect",
                trainerPoints: ["Diskusikan konsep Man-in-the-Middle (MitM) Attack di jaringan terbuka.", "Tegaskan fungsi VPN sebagai pelindung/enkripsi data (Data in Transit) di jaringan asing."],
                options: [
                    {
                        id: "s4_3_optA",
                        label: "Hubungkan komputer administrasi langsung ke Wi-Fi tersebut agar manifest cepat terkirim dan bisnis lancar.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Jaringan terbuka (Public Wi-Fi) sangat rentan disadap (Man-in-the-Middle Attack). Penyerang bisa jadi sengaja membuat nama Wi-Fi palsu (Rogue AP) untuk mencuri email, sandi, dan data manifest kapal Anda.",
                        scoreDelta: { security: -20, operation: +10, compliance: -15, recovery: -5 },
                        recommendedAction: "Dilarang menghubungkan perangkat operasional yang menyimpan data sensitif ke jaringan Wi-Fi publik tanpa enkripsi."
                    },
                    {
                        id: "s4_3_optB",
                        label: "Gunakan jaringan tersebut, namun WAJIB mengaktifkan aplikasi VPN Korporat (Corporate VPN) sebelum membuka email.",
                        feedbackType: "good",
                        explanation: "Keputusan Bisnis yang Kuat! VPN menciptakan 'terowongan terenkripsi'. Meskipun jaringan publik tersebut sedang disadap, peretas hanya akan menangkap data acak tak terbaca. Anda berhasil menyelesaikan tugas logistik secara aman.",
                        scoreDelta: { security: +15, operation: +15, compliance: +10, recovery: +5 },
                        recommendedAction: "VPN wajib diaktifkan sebelum mengirim transmisi data bisnis melalui jalur telekomunikasi luar."
                    },
                    {
                        id: "s4_3_optC",
                        label: "Gunakan fitur Tethering (Hotspot) dari HP probadi kru lokal tanpa pengamanan tambahan perusahaan.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Menggunakan perangkat pribadi (BYOD) tak terkontrol untuk mengirim data manifes perusahaan dapat membocorkan informasi (Data Leakage) jika ponsel kru tersebut sudah terinfeksi aplikasi berbahaya.",
                        scoreDelta: { security: -10, operation: +10, compliance: -10, recovery: 0 },
                        recommendedAction: "Koneksi data resmi kapal harus memanfaatkan kanal yang bisa diaudit dan diproteksi oleh kebijakan keamanan perusahaan."
                    },
                    {
                        id: "s4_3_optD",
                        label: "Tunda pengiriman manifest hingga besok pagi saat internet VSAT kapal selesai diperbaiki.",
                        feedbackType: "dangerous",
                        explanation: "Dampak Bisnis Fatal! Menunda dokumen manifest (Customs/Port Clearance) akan menyebabkan denda ribuan dolar, komplain klien, dan memblokir aktivitas sandar. Keamanan siber harus mencari solusi (seperti VPN), bukan mematikan bisnis.",
                        scoreDelta: { security: +10, operation: -25, compliance: -10, recovery: 0 },
                        recommendedAction: "Praktik keamanan siber yang baik berfungsi sebagai Enabler (Pendorong) bisnis, memberikan jalan yang aman untuk beroperasi."
                    }
                ]
            },
            {
                id: "stage_5_1",
                stage: 5,
                stageTitle: "Stage 5.1: The Open Door",
                title: "Akses Vendor Tanpa Batas",
                context: "Sistem mesin utama kapal dikelola dari jarak jauh oleh vendor pembuat mesin.",
                scenarioText: "Hasil audit siber menemukan bahwa koneksi VPN vendor tersebut dibiarkan 'Aktif Permanen' (24/7). Selain itu, untuk masuk ke sistem, mereka hanya menggunakan username dan password standar tanpa otentikasi tambahan.",
                question: "Kontrol keamanan apa yang paling tepat untuk menutup kerentanan ini?",
                tags: ["Vendor Access Control", "MFA"],
                frameworkFunction: "Protect",
                trainerPoints: ["Diskusikan perbedaan antara kontrol teknis (MFA) dan pengawasan visual.", "Perkenalkan konsep akses Just-in-Time (JIT) bagi vendor."],
                options: [
                    {
                        id: "s5_1_optA",
                        label: "Wajibkan Multi-Factor Authentication (MFA) dan kontrol akses berbasis permintaan (Just-In-Time).",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! MFA dan membatasi waktu akses (Vendor Access Control) adalah 'Preventive Control' (mencegah) yang sangat kuat. Bahkan jika password vendor dicuri, peretas tidak bisa masuk tanpa token MFA.",
                        scoreDelta: { security: +15, operation: +10, compliance: +15, recovery: +0 },
                        recommendedAction: "Hanya aktifkan akses pihak ketiga saat ada permintaan resmi pemeliharaan, dan matikan setelah selesai."
                    },
                    {
                        id: "s5_1_optB",
                        label: "Biarkan VPN aktif, namun tugaskan perwira untuk memantau aktivitas vendor di layar setiap saat.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Pemantauan visual adalah 'Detective Control' (mendeteksi) yang sangat lemah dan menguras tenaga. Serangan otomatis bisa mengeksekusi malware dalam hitungan detik sebelum manusia sempat bereaksi.",
                        scoreDelta: { security: 0, operation: -10, compliance: -5, recovery: 0 },
                        recommendedAction: "Gunakan kontrol teknis (Preventive) untuk mengunci pintu, bukan sekadar memantau siapa yang masuk."
                    },
                    {
                        id: "s5_1_optC",
                        label: "Matikan VPN sepenuhnya. Jika mesin rusak, vendor harus terbang ke pelabuhan.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya bagi Bisnis! Tindakan ini memang 'Preventive', tetapi mematikan efisiensi operasional. Kapal bisa tertunda berhari-hari hanya karena masalah software (misconfiguration) kecil.",
                        scoreDelta: { security: +10, operation: -25, compliance: -10, recovery: -10 },
                        recommendedAction: "Keamanan siber tidak boleh mengorbankan kelancaran operasional (Operation) secara tidak rasional."
                    },
                    {
                        id: "s5_1_optD",
                        label: "Minta vendor meneken perjanjian bahwa mereka bertanggung jawab penuh jika terjadi peretasan.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Perjanjian hukum (Administrative Control) tidak akan mencegah kapal Anda tenggelam atau meledak jika sistem mesin diretas.",
                        scoreDelta: { security: -5, operation: 0, compliance: +5, recovery: 0 },
                        recommendedAction: "Dokumen hukum harus selalu dibarengi dengan kontrol teknis nyata (MFA)."
                    }
                ]
            },
            {
                id: "stage_5_2",
                stage: 5,
                stageTitle: "Stage 5.2: Shared Secrets",
                title: "Folder Terbuka untuk Semua",
                context: "Kapal memiliki satu server file utama (File Server) untuk menyimpan berbagai dokumen operasional.",
                scenarioText: "Anda menyadari bahwa folder 'Manifest & Cargo Docs' dapat dibaca, diedit, dan dihapus (Read & Write) oleh semua orang di kapal (mulai dari kapten, teknisi, hingga koki), terlepas dari apa pun divisinya.",
                question: "Kontrol apa yang seharusnya diterapkan agar dokumen kritis kapal lebih aman dari infeksi silang atau manipulasi?",
                tags: ["Least Privilege", "Access Review"],
                frameworkFunction: "Protect",
                trainerPoints: ["Jelaskan prinsip keamanan 'Least Privilege' (Hak Akses Terendah).", "Diskusikan mengapa bergantung hanya pada Antivirus tidak menyelesaikan masalah hak akses sistem."],
                options: [
                    {
                        id: "s5_2_optA",
                        label: "Pasang Endpoint Protection (Antivirus) paling canggih di komputer koki dan teknisi.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Antivirus memang 'Preventive Control', tetapi jika seseorang (atau malware baru yang tak terdeteksi) secara sengaja menghapus folder, antivirus tidak bisa mencegahnya karena akun koki tersebut 'memiliki hak akses resmi'.",
                        scoreDelta: { security: +5, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Antivirus tidak melindungi Anda dari penyalahgunaan hak akses yang terlalu luas."
                    },
                    {
                        id: "s5_2_optB",
                        label: "Terapkan prinsip Least Privilege, dan lakukan Access Review secara rutin.",
                        feedbackType: "good",
                        explanation: "Sempurna! Membatasi akses hanya kepada pihak yang membutuhkan (Least Privilege) adalah 'Preventive Control' terbaik. Ditambah 'Access Review' rutin sebagai 'Detective Control' untuk memastikan tidak ada akses nyasar.",
                        scoreDelta: { security: +15, operation: +5, compliance: +15, recovery: +0 },
                        recommendedAction: "Berikan izin sesuai peran (Role-Based Access Control / RBAC). Koki tidak butuh akses ke dokumen kargo."
                    },
                    {
                        id: "s5_2_optC",
                        label: "Hapus File Server agar aman, minta semua kru bertukar dokumen menggunakan USB Flashdisk.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Menghapus server dan kembali ke USB flashdisk justru menciptakan mimpi buruk keamanan (penyebaran virus masif) dan menghambat operasi sehari-hari.",
                        scoreDelta: { security: -20, operation: -20, compliance: -15, recovery: -10 },
                        recommendedAction: "Jangan menerapkan kontrol yang menimbulkan masalah baru (residual risk) yang lebih besar."
                    },
                    {
                        id: "s5_2_optD",
                        label: "Berikan pelatihan Awareness Training yang ketat agar kru tidak sengaja menghapus file.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Pelatihan (Awareness) itu penting sebagai lapis awal, namun manusia pasti bisa melakukan kesalahan (Human Error). Sistem teknis harus dirancang untuk membatasi ruang lingkup kesalahan tersebut.",
                        scoreDelta: { security: +5, operation: +5, compliance: 0, recovery: 0 },
                        recommendedAction: "Perkuat manusia dengan edukasi, dan lindungi manusia dari kesalahannya sendiri dengan kontrol teknis."
                    }
                ]
            },
            {
                id: "stage_5_3",
                stage: 5,
                stageTitle: "Stage 5.3: Crossing Lines",
                title: "Wi-Fi Kru dan Sistem Operasi",
                context: "Kru kapal sedang bersantai menggunakan Wi-Fi untuk streaming video dan mengunduh aplikasi di perangkat pribadi mereka.",
                scenarioText: "Tim IT menemukan fakta bahwa jaringan Crew Wi-Fi ini berada di segmen jaringan (network) yang sama persis dengan sistem Engine Control dan ECDIS. Tidak ada pemisah teknis di antara keduanya.",
                question: "Pendekatan perlindungan (Defense Layer) apa yang paling vital untuk menyelesaikan masalah ini?",
                tags: ["Network Segmentation", "Endpoint Protection"],
                frameworkFunction: "Protect",
                trainerPoints: ["Jelaskan mengapa penyatuan jaringan IT/OT melanggar standar keselamatan industri.", "Diskusikan efektivitas pemisahan logis (VLAN/Firewall) vs pemisahan fisik."],
                options: [
                    {
                        id: "s5_3_optA",
                        label: "Buat aturan tertulis (Awareness) larangan keras bagi kru mencoba mengakses IP sistem mesin.",
                        feedbackType: "risky",
                        explanation: "Berisiko Sangat Tinggi. Anda mengandalkan janji kru (Administrative Control). Jika HP kru terinfeksi malware, malware tersebut tidak akan peduli dengan aturan tertulis dan akan langsung menyebar (lateral movement) ke sistem mesin.",
                        scoreDelta: { security: -15, operation: 0, compliance: -10, recovery: 0 },
                        recommendedAction: "Serangan siber otomatis (worm) harus diblokir dengan penghalang teknis fisik atau logis."
                    },
                    {
                        id: "s5_3_optB",
                        label: "Terapkan Network Segmentation (Segmentasi Jaringan) menggunakan VLAN dan Firewall.",
                        feedbackType: "good",
                        explanation: "Langkah Sempurna! Memisahkan jaringan IT/Kru dari jaringan OT (Mesin) adalah 'Preventive Control' paling mendasar sesuai standar IACS dan IEC 62443. Infeksi di HP kru akan tertahan dan tidak bisa menyeberang ke kapal.",
                        scoreDelta: { security: +20, operation: +5, compliance: +15, recovery: +5 },
                        recommendedAction: "Pastikan selalu ada demilitarized zone (DMZ) atau firewall berlapis antara IT dan OT."
                    },
                    {
                        id: "s5_3_optC",
                        label: "Cabut Wi-Fi kru sama sekali agar kapal terjamin 100% aman (Air-Gapped).",
                        feedbackType: "dangerous",
                        explanation: "Berbahaya secara Operasional! Kesejahteraan kru (crew welfare) sangat bergantung pada koneksi internet. Moral yang hancur akan memicu kelalaian (insider threat) dan turn-over pegawai yang tinggi.",
                        scoreDelta: { security: +5, operation: -25, compliance: -5, recovery: 0 },
                        recommendedAction: "Terapkan keamanan siber yang mendukung bisnis dan moral (Secure Business Enabler)."
                    },
                    {
                        id: "s5_3_optD",
                        label: "Pasang Antivirus (Endpoint Protection) berbayar di setiap HP milik pribadi kru kapal.",
                        feedbackType: "risky",
                        explanation: "Tidak Realistis. Anda tidak memiliki wewenang penuh untuk mengatur perangkat pribadi (BYOD) milik kru. Selain itu, ini sangat mahal dan rumit secara privasi.",
                        scoreDelta: { security: +5, operation: -10, compliance: -5, recovery: 0 },
                        recommendedAction: "Lindungi jaringan Anda sendiri, bukan mencoba memperbaiki semua perangkat pribadi kru."
                    }
                ]
            },
            {
                id: "stage_5_4",
                stage: 5,
                stageTitle: "Stage 5.4: The Illusion of Safety",
                title: "Ilusi Data Cadangan",
                context: "Tim IT rutin mencadangkan (backup) seluruh data operasional dan konfigurasi kapal ke Hard Disk Eksternal setiap minggunya.",
                scenarioText: "Ketika auditor bertanya, 'Kapan terakhir kali Anda benar-benar mencoba mengembalikan (restore) data dari backup ini ke sistem kapal yang menyala?' Tim IT terdiam dan menjawab 'Belum pernah, tapi log di aplikasi selalu berkata Backup Successful'.",
                question: "Mengapa praktik ini dianggap sangat berisiko dalam konsep pertahanan (Defense in Depth)?",
                tags: ["Backup and Restore Test", "Incident Response Plan"],
                frameworkFunction: "Recover",
                trainerPoints: ["Garis bawahi bahwa 'Backup yang tidak pernah diuji bukanlah sebuah Backup'.", "Diskusikan mengapa backup yang terhubung terus ke server utama rentan diserang bersamaan."],
                options: [
                    {
                        id: "s5_4_optA",
                        label: "Tidak berisiko. Selama aplikasi mencatat sukses, 'Logging and Monitoring' sudah berjalan baik.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Log sukses hanya menunjukkan file disalin. Seringkali, saat krisis terjadi, file backup tersebut ternyata korup, kadaluarsa, atau butuh password yang sudah hilang. Backup palsu ini menciptakan rasa aman palsu.",
                        scoreDelta: { security: -20, operation: -10, compliance: -15, recovery: -25 },
                        recommendedAction: "Anggap Anda tidak punya backup jika Anda belum pernah berhasil melakukan pengujian restore."
                    },
                    {
                        id: "s5_4_optB",
                        label: "Backup adalah 'Corrective Control' yang tidak berguna jika tanpa adanya 'Restore Test' rutin.",
                        feedbackType: "good",
                        explanation: "Jawaban Luar Biasa! Anda memahami bahwa pemulihan (Corrective) harus divalidasi. Latihan pengembalian data (Restore Test) memastikan bahwa kapal benar-benar bisa bangkit dari serangan ransomware secepat mungkin.",
                        scoreDelta: { security: +10, operation: +15, compliance: +15, recovery: +20 },
                        recommendedAction: "Jadwalkan uji coba pemulihan (DR Test/Restore Test) minimal setahun 2 kali."
                    },
                    {
                        id: "s5_4_optC",
                        label: "Daripada repot menguji, lebih baik Backup langsung ditimpa (overwrite) ke server utama setiap hari.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Jika server utama terkena ransomware (data terenkripsi), dan Anda langsung menimpanya dengan backup otomatis, Anda malah menghancurkan backup yang sehat dengan data yang sudah terinfeksi.",
                        scoreDelta: { security: -25, operation: -20, compliance: -15, recovery: -25 },
                        recommendedAction: "Selalu sediakan Backup secara Offline dan Immutable (tidak bisa diubah/ditimpa secara otomatis)."
                    },
                    {
                        id: "s5_4_optD",
                        label: "Cukup tambahkan catatan tertulis di dalam 'Incident Response Plan' bahwa kapal punya backup.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Dokumen rencana insiden (Administrative) tidak akan menolong Anda memulihkan data jika pada praktiknya secara teknis file backup tersebut korup/rusak.",
                        scoreDelta: { security: -5, operation: -5, compliance: -5, recovery: -10 },
                        recommendedAction: "Validasi rencana tertulis (Plan) dengan pengujian simulasi dunia nyata (Drill)."
                    }
                ]
            },
            {
                id: "stage_5_5",
                stage: 5,
                stageTitle: "Stage 5.5: Blind in the Dark",
                title: "Menyelidiki Tanpa Jejak",
                context: "Terjadi anomali teknis pada sistem monitoring tangki balas (Ballast) di tengah malam.",
                scenarioText: "Sistem menyeimbangkan air secara acak. Saat tim teknis dan perwira kapal mencoba menginvestigasi siapa yang memberi perintah (apakah human error, error sistem, atau peretas), mereka mendapati tidak ada satu pun riwayat catatan (log file) yang tersedia di komputer tersebut.",
                question: "Jika hal ini terjadi di kapal Anda, kontrol keamanan apa yang terbukti GAGAL atau tidak diterapkan?",
                tags: ["Logging and Monitoring", "Incident Response"],
                frameworkFunction: "Detect",
                trainerPoints: ["Diskusikan fungsi log sebagai kamera CCTV di dunia digital (Detective Control).", "Jelaskan bahwa respons insiden tanpa data log sama dengan investigasi buta."],
                options: [
                    {
                        id: "s5_5_optA",
                        label: "Kegagalan pada 'Logging and Monitoring' sebagai 'Detective Control' krusial.",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! Tanpa log aktivitas (Logging), Anda menjadi buta dalam ruang gelap. Anda tidak bisa merespons (Respond) atau memulihkan (Recover) insiden jika Anda tidak bisa mendeteksi (Detect) kapan dan bagaimana kejadian itu bermula.",
                        scoreDelta: { security: +15, operation: +15, compliance: +15, recovery: +5 },
                        recommendedAction: "Pastikan semua peralatan kritikal OT menyimpan event logs minimal 6 bulan dan dipantau anomali-nya secara terpusat."
                    },
                    {
                        id: "s5_5_optB",
                        label: "Kegagalan pada 'Preventive Control' karena Endpoint Protection tidak memblokir akses.",
                        feedbackType: "risky",
                        explanation: "Kurang Akurat. Antivirus mungkin gagal mencegah insiden, tapi ketiadaan jejak penyelidikan adalah masalah spesifik karena tidak adanya sistem audit/log yang berjalan.",
                        scoreDelta: { security: +5, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Bedakan antara alat pencegah (Antivirus/Firewall) dan alat pencatat (Log/SIEM)."
                    },
                    {
                        id: "s5_5_optC",
                        label: "Kegagalan 'Corrective Control', karena tim investigasi tidak tahu cara memperbaiki tangki balas.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Memperbaiki mesin adalah tahap lanjutan (Recovery/Corrective). Masalah inti di sini adalah mereka tidak memiliki informasi historis (Detective) untuk menyimpulkan akar masalah.",
                        scoreDelta: { security: 0, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Tindakan perbaikan yang benar (Corrective) sangat bergantung pada ketepatan investigasi log (Detective)."
                    },
                    {
                        id: "s5_5_optD",
                        label: "Ini murni karena kurangnya 'Awareness Training' sehingga perwira jaga panik.",
                        feedbackType: "risky",
                        explanation: "Tidak Tepat. Perwira sudah melakukan tindakan tepat dengan mencoba menginvestigasi. Kepanikan terjadi karena sistem teknis (Logs) tidak mendukung pekerjaan mereka, bukan karena kurang edukasi.",
                        scoreDelta: { security: -5, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Jangan selalu menyalahkan kelalaian kru (human factor) saat sistem (technology factor) tidak dikonfigurasi dengan benar."
                    }
                ]
            },
            {
                id: "stage_6_1",
                stage: 6,
                stageTitle: "Stage 6.1: The Midnight Anomalies",
                title: "Event vs Alert vs Incident",
                context: "Pukul 02:15 dini hari, saat tidak ada jadwal pemeliharaan sistem, Security Information and Event Management (SIEM) kapal memunculkan kumpulan log berikut:",
                scenarioText: `
                <div class="overflow-x-auto my-4 border border-slate-200 rounded-lg shadow-sm">
                    <table class="min-w-full bg-white text-sm text-left">
                        <thead class="bg-slate-100 text-slate-600">
                            <tr>
                                <th class="py-2 px-3">Time</th>
                                <th class="py-2 px-3">Source</th>
                                <th class="py-2 px-3">Event</th>
                                <th class="py-2 px-3">Detail</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr><td class="py-2 px-3">02:15</td><td class="py-2 px-3 font-semibold text-navy">VPN Server</td><td class="py-2 px-3">Login Success</td><td class="py-2 px-3">User: vendor_nav</td></tr>
                            <tr><td class="py-2 px-3">02:16</td><td class="py-2 px-3 font-semibold text-navy">Firewall</td><td class="py-2 px-3">Traffic Allowed</td><td class="py-2 px-3">VPN -> File Server</td></tr>
                            <tr class="bg-orange-50"><td class="py-2 px-3 text-warning font-bold">02:20</td><td class="py-2 px-3 font-semibold text-navy">File Server</td><td class="py-2 px-3 text-warning font-bold">File Rename</td><td class="py-2 px-3">100+ files changed to .locked</td></tr>
                            <tr class="bg-red-50"><td class="py-2 px-3 text-danger font-bold">02:21</td><td class="py-2 px-3 font-semibold text-navy">EDR</td><td class="py-2 px-3 text-danger font-bold">Process Blocked</td><td class="py-2 px-3">encrypt.exe blocked</td></tr>
                        </tbody>
                    </table>
                </div>
                `,
                question: "Berdasarkan log di atas, event mana yang menjadi indikator paling pasti bahwa sebuah Insiden Siber (Incident) sedang aktif terjadi, bukan sekadar kejadian normal atau anomali belaka?",
                tags: ["Event Analysis", "Alert", "Incident"],
                frameworkFunction: "Detect",
                trainerPoints: ["Diskusikan perbedaan definisi Event (aktivitas log harian), Alert (deteksi keamanan), dan Incident (bencana berdampak nyata).", "Gunakan tabel untuk menunjukkan bagaimana satu log harus dianalisis secara berurutan untuk mendapat gambaran lengkap."],
                options: [
                    {
                        id: "s6_1_optA",
                        label: "VPN Server: Login Success (02:15)",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Login di luar jam kerja adalah Anomali (kejadian tidak biasa) dan bisa memicu Alert (peringatan), namun belum tentu sebuah Incident (insiden merugikan). Bisa jadi vendor memang sedang lembur dadakan.",
                        scoreDelta: { security: +5, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Bedakan antara Event (kejadian biasa), Alert (kejadian mencurigakan), dan Incident (kejadian yang merusak/mengganggu operasi)."
                    },
                    {
                        id: "s6_1_optB",
                        label: "File Server: 100+ files changed to .locked (02:20)",
                        feedbackType: "good",
                        explanation: "Sangat Tepat! Ratusan file yang berubah esktensinya menjadi .locked dalam hitungan detik adalah karakteristik pasti dari serangan Ransomware aktif. Ini telah berubah dari sekadar Alert menjadi sebuah Insiden Kritis nyata.",
                        scoreDelta: { security: +15, operation: +10, compliance: +5, recovery: +5 },
                        recommendedAction: "Fokuskan identifikasi insiden pada bukti dampak langsung (impact) pada integritas aset data."
                    },
                    {
                        id: "s6_1_optC",
                        label: "Firewall: Traffic Allowed (02:16)",
                        feedbackType: "dangerous",
                        explanation: "Berbahaya. Ini adalah log aktivitas normal firewall. Menyimpulkan ini sebagai insiden siber akan menciptakan terlalu banyak 'False Positive' (alarm palsu) dan membuat tim IT kewalahan.",
                        scoreDelta: { security: -10, operation: -10, compliance: 0, recovery: 0 },
                        recommendedAction: "Gunakan konteks untuk membaca log firewall. Traffic yang diperbolehkan bukan berarti insiden, kecuali traffic tersebut membawa beban berbahaya (payload)."
                    },
                    {
                        id: "s6_1_optD",
                        label: "EDR: Process Blocked (02:21)",
                        feedbackType: "risky",
                        explanation: "Berisiko. EDR (Endpoint Detection & Response) berhasil memblokir proses 'encrypt.exe'. Namun perhatikan log sebelumnya: 100+ file SUDAH terkunci sebelum diblokir. Kerusakan sudah terjadi, jadi fokus utama validasi insiden ada pada log file rename.",
                        scoreDelta: { security: +5, operation: +5, compliance: 0, recovery: 0 },
                        recommendedAction: "Meskipun alat keamanan memblokir sesuatu, Anda harus mengecek apakah ada proses berbahaya yang berhasil lolos sebelum pemblokiran terjadi."
                    }
                ]
            },
            {
                id: "stage_6_2",
                stage: 6,
                stageTitle: "Stage 6.2: Doing the Triage",
                title: "Menyeleksi Fakta Log",
                context: "Anda telah mengonfirmasi adanya indikasi Ransomware. Sekarang Anda masuk ke tahap 'Triage' (penyelidikan dan penilaian awal).",
                scenarioText: "Tujuan dari Triage dalam insiden siber adalah untuk memahami seberapa luas serangan ini dan mengumpulkan informasi spesifik (konteks) sebelum memutuskan langkah isolasi yang lebih drastis.",
                question: "Untuk menelusuri dari mana asal serangan ini, log tambahan (Detective Control) mana yang paling relevan untuk segera Anda periksa?",
                tags: ["Triage", "Investigation", "Log Analysis"],
                frameworkFunction: "Detect",
                trainerPoints: ["Jelaskan prinsip Triage: mencari fakta teknis dengan cepat dan spesifik untuk menahan dampak.", "Diskusikan mengapa tidak boleh gegabah melompat ke kesimpulan tanpa menelusuri akar lalu lintas (traffic) di log."],
                options: [
                    {
                        id: "s6_2_optA",
                        label: "Log suhu ruang server dan log CCTV di sekitar ruang mesin.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Bukti dari Firewall menunjukkan lalu lintas datang dari VPN luar (Remote), bukan dari seseorang yang menyusup ke ruang server secara fisik.",
                        scoreDelta: { security: 0, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Penyelidikan harus berbasis data (data-driven). Ikuti jejak digital dari log peringatan yang pertama kali muncul."
                    },
                    {
                        id: "s6_2_optB",
                        label: "Log Absensi (Daftar Jaga) kru kapal untuk melihat siapa perwira yang bertugas.",
                        feedbackType: "risky",
                        explanation: "Kurang Relevan. Meskipun penting untuk mengetahui siapa saksi mata, hal ini tidak akan memberi Anda informasi teknis tentang bagaimana file-file tersebut dienkripsi.",
                        scoreDelta: { security: 0, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Prioritaskan triage pada sistem teknis (IT/OT) yang terindikasi disusupi terlebih dahulu."
                    },
                    {
                        id: "s6_2_optC",
                        label: "Log penggunaan kuota internet kru (Crew Wi-Fi).",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Anda membuang waktu kritis penyelidikan (Triage) untuk mengecek hal yang tidak terkait sama sekali dengan log awal (yang jelas-jelas menyebut jalur VPN Vendor).",
                        scoreDelta: { security: -15, operation: -15, compliance: -5, recovery: -10 },
                        recommendedAction: "Fokus pada vektor serangan utama. Kecepatan sangat krusial selama fase Triage."
                    },
                    {
                        id: "s6_2_optD",
                        label: "Audit Log dari File Server secara spesifik untuk aktivitas akun 'vendor_nav'.",
                        feedbackType: "good",
                        explanation: "Sempurna! Karena log menunjukkan akun 'vendor_nav' terhubung sesaat sebelum file berubah nama, mengecek Audit Log akun tersebut di File Server adalah langkah Triage yang paling akurat untuk mengisolasi pelaku.",
                        scoreDelta: { security: +15, operation: +10, compliance: +10, recovery: +5 },
                        recommendedAction: "Lakukan Triage layaknya detektif: Kumpulkan bukti teknis, persempit fokus, dan tentukan akar masalah (Root Cause)."
                    }
                ]
            },
            {
                id: "stage_6_3",
                stage: 6,
                stageTitle: "Stage 6.3: How Bad Is It?",
                title: "Menentukan Level Severity",
                context: "Hasil Triage mengonfirmasi: Sebuah Ransomware sedang aktif bergerak menggunakan kredensial vendor yang dicuri.",
                scenarioText: "File Server yang diserang ternyata menyimpan Dokumen Kargo, Manifest, dan Izin Pelabuhan. Kapal dijadwalkan merapat (Clearance) di pelabuhan dalam waktu 4 jam. Tanpa dokumen tersebut, kapal akan ditolak masuk dan didenda puluhan ribu dolar. Proses enkripsi file masih terus berjalan (belum terhenti sepenuhnya).",
                question: "Berdasarkan kekritisan aset (Asset Criticality) dan aktivitas yang sedang berlangsung, berapakah tingkat Severity (Keparahan) untuk kasus (Case) ini?",
                tags: ["Severity", "Incident Categorization", "Impact"],
                frameworkFunction: "Respond",
                trainerPoints: ["Diskusikan 3 parameter penentu Severity: Nilai Aset, Besaran Dampak Finansial/Nyawa, dan Status Penyebaran Aktif.", "Ajarkan protokol kapan sebuah insiden 'IT biasa' harus dideklarasikan menjadi 'Krisis Bisnis' di kapal."],
                options: [
                    {
                        id: "s6_3_optA",
                        label: "Low (Rendah) - Ini hanya masalah file yang berubah nama, sistem mesin utama tidak terpengaruh.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Anda gagal mengidentifikasi dampak bisnis operasional. Dokumen Manifest adalah aset kritikal. Tanpanya, kapal tidak bisa sandar, menyebabkan kerugian finansial masif.",
                        scoreDelta: { security: -20, operation: -25, compliance: -20, recovery: -15 },
                        recommendedAction: "Severity tidak hanya dinilai dari seberapa canggih serangannya, tapi seberapa besar dampaknya bagi nyawa, bisnis, dan kepatuhan."
                    },
                    {
                        id: "s6_3_optB",
                        label: "Medium (Sedang) - Ada gangguan, tapi bisa dilaporkan besok pagi saat jam kerja.",
                        feedbackType: "risky",
                        explanation: "Berisiko Tinggi. Menunda penanganan hingga pagi hari berarti Ransomware memiliki waktu ekstra 4 jam untuk melompat dari File Server ke sistem kritis lain di kapal.",
                        scoreDelta: { security: -10, operation: -15, compliance: -10, recovery: -10 },
                        recommendedAction: "Serangan siber tidak mengenal jam kerja. Tangani peringatan ransomware secara langsung."
                    },
                    {
                        id: "s6_3_optC",
                        label: "High (Tinggi) - File penting terkunci, namun pergerakan ransomware mungkin sudah selesai.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Informasi menyatakan bahwa 'proses enkripsi masih terus berjalan'. Menurunkannya ke High dapat membuat tim melonggarkan langkah pengisolasian darurat.",
                        scoreDelta: { security: -5, operation: -5, compliance: -5, recovery: 0 },
                        recommendedAction: "Aktivitas jahat yang masih berlangsung/menyebar (ongoing propagation) selalu menaikkan tingkat Severity."
                    },
                    {
                        id: "s6_3_optD",
                        label: "Critical (Kritis) - Aset operasional tinggi terancam, dampak bisnis sangat besar, dan ancaman sedang aktif menyebar.",
                        feedbackType: "good",
                        explanation: "Sangat Tepat! Kombinasi dari: (1) Aset penting untuk clearance sandar, (2) Dampak finansial kerugian besar, dan (3) Insiden masih aktif menyebar (Ongoing). Ini memenuhi semua syarat deklarasi Insiden Kritis (Critical Incident).",
                        scoreDelta: { security: +15, operation: +15, compliance: +15, recovery: +10 },
                        recommendedAction: "Segera aktivasi prosedur keadaan darurat siber berdasarkan Incident Response Plan."
                    }
                ]
            },
            {
                id: "stage_6_4",
                stage: 6,
                stageTitle: "Stage 6.4: Stop the Bleeding",
                title: "Tindakan Containment Awal",
                context: "Insiden telah dideklarasikan sebagai CRITICAL. Ransomware menyebar dengan cepat melalui koneksi VPN ke seluruh File Server.",
                scenarioText: "Tujuan utama pada fase ini adalah Containment (Pengisolasian). Anda harus segera 'menghentikan pendarahan' agar serangan tidak merambat ke sistem kemudi atau mesin kontrol (OT).",
                question: "Apa langkah Containment pertama yang harus segera dilakukan?",
                tags: ["Containment", "Isolation", "Incident Response"],
                frameworkFunction: "Respond",
                trainerPoints: ["Tekankan mengapa mencabut colokan daya (Power off) bisa merusak bukti forensik di RAM.", "Jelaskan konsep Logical Isolation (VLAN/VPN drop) vs Physical Isolation (Cabut Kabel LAN)."],
                options: [
                    {
                        id: "s6_4_optA",
                        label: "Segera putuskan koneksi VPN eksternal dan cabut kabel LAN File Server (pisahkan dari jaringan).",
                        feedbackType: "good",
                        explanation: "Langkah Penyelamatan Sempurna! Memutuskan VPN memotong akses kendali (C2) dari sang peretas, dan mencabut kabel jaringan (Logical/Physical Isolation) mengurung ransomware hanya di satu server.",
                        scoreDelta: { security: +20, operation: +10, compliance: +15, recovery: +15 },
                        recommendedAction: "Containment harus dilakukan secepat mungkin. Biarkan komputer/server tetap menyala (on) namun terisolasi."
                    },
                    {
                        id: "s6_4_optB",
                        label: "Cabut kabel daya (Power Off) File Server secara paksa (cabut colokan listrik).",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Mematikan paksa server akan menghapus data di memori RAM (Volatile Data) yang sangat penting bagi tim Forensik untuk mencari kunci dekripsi ransomware atau melihat cara peretas masuk.",
                        scoreDelta: { security: -20, operation: -5, compliance: -15, recovery: -20 },
                        recommendedAction: "JANGAN PERNAH mematikan daya (Power Down) perangkat yang terinfeksi ransomware kecuali diinstruksikan oleh tim Incident Responder ahli."
                    },
                    {
                        id: "s6_4_optC",
                        label: "Kirim email peringatan ke vendor pembuat VPN untuk menanyakan mengapa mereka meretas kapal.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Anda membuang waktu emas pengisolasian. Selama Anda mengetik email, ransomware akan terus mengenkripsi sisa file kargo Anda.",
                        scoreDelta: { security: -25, operation: -20, compliance: -10, recovery: -15 },
                        recommendedAction: "Jangan melakukan interogasi saat rumah sedang terbakar. Padamkan apinya (Containment) terlebih dahulu."
                    },
                    {
                        id: "s6_4_optD",
                        label: "Jalankan Antivirus Full Scan pada File Server dan tunggu hingga selesai 100%.",
                        feedbackType: "risky",
                        explanation: "Berisiko Tinggi. Antivirus scanning bisa memakan waktu berjam-jam. Ransomware bekerja jauh lebih cepat dari proses scanning konvensional.",
                        scoreDelta: { security: -10, operation: -10, compliance: -5, recovery: -10 },
                        recommendedAction: "Pengisolasian jaringan jauh lebih efektif dan instan daripada menunggu pemindaian software saat diserang ransomware aktif."
                    }
                ]
            },
            {
                id: "stage_6_5",
                stage: 6,
                stageTitle: "Stage 6.5: Call for Help",
                title: "Prosedur Eskalasi",
                context: "Tindakan pengisolasian (Containment) berhasil dilakukan. Ancaman berhenti menyebar.",
                scenarioText: "Sekarang kapal berada pada kondisi aman namun terdegradasi (File server tidak berfungsi). Berdasarkan rencana respons insiden (Incident Response Plan), Anda memiliki kewajiban untuk melakukan eskalasi insiden kritis ini.",
                question: "Kepada siapakah Anda harus melaporkan (melakukan eskalasi) insiden ini pertama kali sesuai struktur pelaporan maritim?",
                tags: ["Escalation", "Communication", "Incident Response"],
                frameworkFunction: "Respond",
                trainerPoints: ["Diskusikan 'Chain of Command' di kapal (Kapten, DPA, Tim SOC).", "Pertegas larangan mutlak menyebarkan info insiden ke luar (Media Sosial) tanpa persetujuan tim Legal/Humas."],
                options: [
                    {
                        id: "s6_5_optA",
                        label: "Langsung laporkan ke Otoritas Pelabuhan setempat agar mereka menangkap pelakunya.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Melapor ke eksternal tanpa melalui prosedur komunikasi krisis internal (CSO/DPA) dapat melanggar protokol kebijakan perusahaan dan menciptakan kebingungan komando.",
                        scoreDelta: { security: 0, operation: -10, compliance: -10, recovery: 0 },
                        recommendedAction: "Pahami rantai komando (Chain of Command). Eskalasi eksternal biasanya dilakukan oleh tim legal atau manajemen tertinggi (DPA)."
                    },
                    {
                        id: "s6_5_optB",
                        label: "Tim Residen Keamanan IT Darat (SOC / Incident Response Team) dan Kapten Kapal.",
                        feedbackType: "good",
                        explanation: "Tepat Sekali! Kapten adalah pemegang otoritas absolut di atas kapal dan harus diinformasikan segera (terutama mengenai dampak operasional clearance pelabuhan), sementara tim SOC Darat akan memberikan bantuan teknis jarak jauh atau forensik.",
                        scoreDelta: { security: +15, operation: +15, compliance: +15, recovery: +10 },
                        recommendedAction: "Pastikan kontak darurat IT Security dan DPA (Designated Person Ashore) tertempel dan mudah diakses di anjungan/ruang kontrol."
                    },
                    {
                        id: "s6_5_optC",
                        label: "Memposting foto layar komputer yang terkena ransomware ke grup WhatsApp komunitas maritim agar mereka waspada.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Ini adalah pelanggaran besar terhadap Non-Disclosure Agreement (NDA) dan prosedur komunikasi krisis. Membocorkan insiden aktif dapat merusak reputasi perusahaan dan memberi peretas keunggulan intelijen.",
                        scoreDelta: { security: -20, operation: -20, compliance: -25, recovery: -10 },
                        recommendedAction: "Semua komunikasi keluar terkait insiden keamanan harus dikontrol secara ketat (Need-to-Know basis)."
                    },
                    {
                        id: "s6_5_optD",
                        label: "Vendor pembuat VPN tersebut untuk meminta ganti rugi data.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Negosiasi ganti rugi adalah urusan Legal dan Manajemen belakangan. Prioritas saat insiden baru saja terisolasi adalah mengumpulkan bantuan teknis pemulihan internal.",
                        scoreDelta: { security: -5, operation: -5, compliance: -5, recovery: -5 },
                        recommendedAction: "Fokus pada stabilisasi operasional (Operation) sebelum mencari pihak yang disalahkan secara hukum."
                    }
                ]
            },
            {
                id: "stage_7_1",
                stage: 7,
                stageTitle: "Stage 7.1: Look Before You Leap",
                title: "Validasi Sebelum Pemulihan",
                context: "Ransomware di File Server telah berhasil diisolasi (Containment). Server tersebut kini siap untuk dipulihkan dari data cadangan (Backup).",
                scenarioText: "Tim IT sudah menyiapkan Hard Disk eksternal yang berisi data backup bersih dari hari kemarin. Mereka siap untuk menekan tombol 'Restore' untuk mengembalikan operasional pelabuhan.",
                question: "Langkah kritikal apa yang harus Anda pastikan sudah selesai DILAKUKAN sebelum proses restore data dimulai?",
                tags: ["Recovery", "Validation", "Eradication"],
                frameworkFunction: "Recover",
                trainerPoints: ["Jelaskan mengapa terburu-buru melakukan Restore tanpa membersihkan akar infeksi akan memicu re-infeksi seketika.", "Diskusikan proses Eradication (pembersihan) virus yang wajib tuntas sebelum Recovery dimulai."],
                options: [
                    {
                        id: "s7_1_optA",
                        label: "Pastikan celah keamanan awal (misal: password vendor yang lemah) sudah ditutup dan malware telah dihapus (Eradication).",
                        feedbackType: "good",
                        explanation: "Sangat Tepat! Memulihkan data ke sistem yang kerentanannya masih terbuka sama saja dengan memberi makan ransomware untuk kedua kalinya. Anda harus memastikan akar masalah (Root Cause) telah diperbaiki sebelum Restore.",
                        scoreDelta: { security: +15, operation: +10, compliance: +10, recovery: +15 },
                        recommendedAction: "Fase Eradication (Pembersihan) harus tuntas sebelum fase Recovery (Pemulihan) dimulai."
                    },
                    {
                        id: "s7_1_optB",
                        label: "Langsung lakukan restore secepat mungkin agar kapal tidak terkena denda keterlambatan lebih besar.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Jika peretas masih memiliki akses VPN atau malware masih bersembunyi di memori (Eradication belum selesai), data backup bersih Anda akan langsung terenkripsi kembali begitu di-restore.",
                        scoreDelta: { security: -20, operation: -15, compliance: -10, recovery: -20 },
                        recommendedAction: "Ketergesaan dalam pemulihan sering kali menyebabkan infeksi ulang (Re-infection)."
                    },
                    {
                        id: "s7_1_optC",
                        label: "Lakukan restart pada server untuk memastikan sistemnya fresh sebelum di-restore.",
                        feedbackType: "dangerous",
                        explanation: "Fatal! Melakukan restart pada mesin yang sedang diinvestigasi akan menghapus bukti di memori (RAM) dan bisa memicu skrip ransomware untuk mengenkripsi sisa drive yang belum tersentuh.",
                        scoreDelta: { security: -15, operation: -10, compliance: -15, recovery: -15 },
                        recommendedAction: "Jalankan prosedur pemulihan hanya di sistem yang sudah divalidasi kebersihannya atau di mesin baru/steril."
                    },
                    {
                        id: "s7_1_optD",
                        label: "Minta persetujuan vendor VPN karena mereka yang pertama kali menyebabkan ini.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Otoritas pemulihan ada di tangan Kapten, Manajemen, dan Tim Tanggap Insiden Internal, bukan menunggu izin dari vendor yang keamanannya sedang dikompromikan.",
                        scoreDelta: { security: 0, operation: -10, compliance: -5, recovery: -5 },
                        recommendedAction: "Pegang kendali penuh atas proses Recovery operasional Anda sendiri."
                    }
                ]
            },
            {
                id: "stage_7_2",
                stage: 7,
                stageTitle: "Stage 7.2: Prove It Works",
                title: "Bukti Keandalan Cadangan Data",
                context: "Manajemen bertanya kepada tim IT, 'Apakah kita yakin data kargo dan manifest bisa dikembalikan?'",
                scenarioText: "Tim IT menjawab bahwa mereka memiliki jadwal backup otomatis setiap malam dan log selalu menunjukkan warna hijau ('Successful'). Namun, manajemen membutuhkan jaminan kepastian karena clearance pelabuhan bergantung padanya.",
                question: "Bukti apa yang paling valid untuk menjamin bahwa backup tersebut benar-benar dapat digunakan (Usable)?",
                tags: ["Backup Verification", "Restore Test"],
                frameworkFunction: "Recover",
                trainerPoints: ["Tegaskan: Backup yang tidak pernah diuji bukanlah sebuah Backup, ia hanya sebuah harapan.", "Diskusikan pengalaman buruk industri akibat file backup yang ternyata korup setelah disalin."],
                options: [
                    {
                        id: "s7_2_optA",
                        label: "Menunjukkan notifikasi email harian yang bertuliskan 'Backup Job Completed 100%'.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Status 'Completed' hanya berarti file telah disalin. Status ini tidak menjamin bahwa file tersebut tidak korup, lengkap, atau bisa dibaca kembali oleh aplikasi manifest kargo.",
                        scoreDelta: { security: 0, operation: -5, compliance: -5, recovery: 0 },
                        recommendedAction: "Jangan tertipu oleh indikator warna hijau dari software pencadangan."
                    },
                    {
                        id: "s7_2_optB",
                        label: "Menunjukkan dokumen SLA (Service Level Agreement) dari vendor software backup.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. SLA adalah dokumen hukum yang berjanji perangkat lunaknya bagus, namun SLA tidak membuktikan bahwa data spesifik kapal Anda selamat dari ransomware.",
                        scoreDelta: { security: 0, operation: -5, compliance: -5, recovery: -5 },
                        recommendedAction: "Keamanan operasional butuh bukti teknis, bukan sekadar janji tertulis vendor."
                    },
                    {
                        id: "s7_2_optC",
                        label: "Hasil dokumentasi dari kegiatan 'Restore Test' terbaru yang berhasil memulihkan data ke server simulasi.",
                        feedbackType: "good",
                        explanation: "Sempurna! Satu-satunya bukti empiris bahwa cadangan data Anda berfungsi adalah dengan benar-benar mengujinya (Perform Restore Test). Ini memastikan integritas data dan mengukur berapa lama waktu pemulihan (RTO).",
                        scoreDelta: { security: +15, operation: +15, compliance: +15, recovery: +20 },
                        recommendedAction: "Jadikan 'Restore Test' sebagai KPI (Key Performance Indicator) rutin bagi tim IT operasional."
                    },
                    {
                        id: "s7_2_optD",
                        label: "Mengecek ukuran file (File Size) dari hard disk eksternal, jika ukurannya besar berarti aman.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Ransomware mengenkripsi file tanpa mengubah ukurannya secara drastis. File berukuran 500GB yang sudah terenkripsi ransomware akan tetap terlihat berukuran 500GB namun isinya hancur.",
                        scoreDelta: { security: -15, operation: -15, compliance: -10, recovery: -20 },
                        recommendedAction: "Lakukan validasi integritas data secara mendalam, bukan sekadar melihat ukuran file di disk."
                    }
                ]
            },
            {
                id: "stage_7_3",
                stage: 7,
                stageTitle: "Stage 7.3: Preserve the Past",
                title: "Mengamankan Bukti Forensik",
                context: "Tim IT sudah menyiapkan server cadangan yang bersih untuk mengambil alih operasional (Recovery).",
                scenarioText: "Server asli yang terkena ransomware kini menganggur dan terisolasi. Manajemen menginstruksikan: 'Segera format ulang (Wipe) server yang terinfeksi itu agar kita bisa memakainya lagi untuk keperluan lain'.",
                question: "Apa tindakan yang seharusnya diambil terhadap server yang terinfeksi sebelum diformat?",
                tags: ["Digital Forensics", "Evidence Preservation", "Compliance"],
                frameworkFunction: "Recover",
                trainerPoints: ["Diskusikan konsep Chain of Custody (Rantai Bukti) dan mengapa Wipe sama dengan membakar TKP digital.", "Jelaskan keuntungan mengamankan Evidence Pack untuk audit kepatuhan atau klaim asuransi."],
                options: [
                    {
                        id: "s7_3_optA",
                        label: "Turuti perintah manajemen, segera format server tersebut agar tidak ada sisa virus yang tertinggal.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Berbahaya! Memformat drive berarti Anda secara sengaja menghancurkan Tempat Kejadian Perkara (TKP) digital. Anda akan kehilangan jejak peretas dan tidak bisa melakukan analisis akar masalah (Root Cause).",
                        scoreDelta: { security: -20, operation: +5, compliance: -20, recovery: -15 },
                        recommendedAction: "Jangan pernah menghancurkan bukti sebelum penyelidikan forensik dinyatakan ditutup secara resmi."
                    },
                    {
                        id: "s7_3_optB",
                        label: "Buat Salinan Bukti Digital (Evidence Pack) seperti Image Disk dan Memory Dump sebelum diformat.",
                        feedbackType: "good",
                        explanation: "Langkah Tepat! Membuat 'Evidence Pack' adalah standar emas. Bukti ini diperlukan untuk pelaporan ke otoritas maritim, klaim asuransi siber, dan analisis forensik lanjutan guna mencari kunci dekripsi.",
                        scoreDelta: { security: +15, operation: +5, compliance: +20, recovery: +10 },
                        recommendedAction: "Bekerja samalah dengan ahli forensik (DFIR) untuk memastikan proses 'Imaging' data tidak merusak bukti asli (Chain of Custody)."
                    },
                    {
                        id: "s7_3_optC",
                        label: "Cetak (Print) log yang terlihat di layar lalu masukkan ke dalam folder fisik untuk diarsipkan.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Kertas yang diprint tidak berguna untuk penyelidikan teknis lanjutan. Tim forensik membutuhkan file log mentah (raw data) dan struktur direktori digital.",
                        scoreDelta: { security: -5, operation: 0, compliance: -10, recovery: -5 },
                        recommendedAction: "Penyelidikan siber membutuhkan bukti digital yang utuh, bukan sekadar tangkapan layar (screenshot)."
                    },
                    {
                        id: "s7_3_optD",
                        label: "Copy/paste saja file yang terenkripsi ke flashdisk sebagai bukti bahwa kita diserang.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Melakukan Copy/Paste biasa akan mengubah metadata file (seperti tanggal 'Modified'). Selain itu, ini tidak menyalin file sistem (Logs/Registry) tempat asal mula serangan terjadi.",
                        scoreDelta: { security: -10, operation: 0, compliance: -5, recovery: 0 },
                        recommendedAction: "Gunakan metode 'Bit-by-Bit Copy' (Forensic Imaging) alih-alih copy-paste biasa."
                    }
                ]
            },
            {
                id: "stage_7_4",
                stage: 7,
                stageTitle: "Stage 7.4: Post-Incident Review",
                title: "Belajar dari Kesalahan",
                context: "Operasional kapal akhirnya kembali normal (Recovered). Insiden ransomware secara teknis telah selesai.",
                scenarioText: "Tim merasa kelelahan dan siap untuk kembali ke rutinitas normal. Namun, satu tahap terakhir dalam siklus hidup respons insiden (Incident Response Lifecycle) menurut standar NIST CSF belum dilakukan.",
                question: "Kegiatan kritis apa yang harus dilakukan setelah sistem berhasil pulih 100%?",
                tags: ["Lessons Learned", "Continuous Improvement", "Govern"],
                frameworkFunction: "Recover",
                trainerPoints: ["Diskusikan tahapan Lessons Learned untuk memutus rantai serangan berulang.", "Jelaskan bahaya menciptakan 'Blame Culture' (Budaya Saling Menyalahkan) di antara kru pasca insiden."],
                options: [
                    {
                        id: "s7_4_optA",
                        label: "Melakukan rapat 'Lessons Learned' untuk mengevaluasi apa yang salah, apa yang berjalan baik, dan memperbaiki prosedur.",
                        feedbackType: "good",
                        explanation: "Sempurna! Fase 'Lessons Learned' (Belajar dari Pengalaman) adalah inti dari konsep 'Improvement'. Tanpa evaluasi ini, perusahaan akan mengulangi kesalahan yang sama di masa depan.",
                        scoreDelta: { security: +15, operation: +15, compliance: +20, recovery: +15 },
                        recommendedAction: "Selalu dokumentasikan hasil evaluasi pasca-insiden menjadi pembaruan kebijakan operasional yang lebih kuat."
                    },
                    {
                        id: "s7_4_optB",
                        label: "Mencari siapa kru yang mengklik email phishing atau vendor yang ceroboh untuk diberikan surat peringatan (SP) atau dipecat.",
                        feedbackType: "risky",
                        explanation: "Berisiko. Budaya menyalahkan (Blame Culture) membuat staf takut melapor di kemudian hari. Insiden siber jarang sekali terjadi murni karena satu kesalahan individu, melainkan kegagalan sistemik (kurangnya kontrol teknis).",
                        scoreDelta: { security: 0, operation: -10, compliance: -10, recovery: 0 },
                        recommendedAction: "Fokuslah memperbaiki celah sistem (proses/teknologi), bukan menghukum ketidaktahuan manusia."
                    },
                    {
                        id: "s7_4_optC",
                        label: "Merahasiakan kejadian ini sepenuhnya dari awak kapal lain dan perusahaan agar reputasi kapten tidak buruk.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Fatal! Menutupi insiden ('Security by Obscurity') melanggar aturan pelaporan kepatuhan maritim (IMO/IACS) dan menghalangi kapal lain di armada Anda untuk belajar dari kerentanan ini.",
                        scoreDelta: { security: -20, operation: -10, compliance: -25, recovery: -15 },
                        recommendedAction: "Transparansi dan pembagian informasi ancaman (Threat Intelligence Sharing) adalah fondasi pertahanan siber modern."
                    },
                    {
                        id: "s7_4_optD",
                        label: "Langsung membeli software antivirus/firewall yang lebih mahal dari sebelumnya.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Membeli alat baru tanpa menganalisis mengapa alat lama gagal (lewat rapat Lessons Learned) hanya akan menghasilkan miskonfigurasi yang sama pada alat yang baru.",
                        scoreDelta: { security: +5, operation: -5, compliance: 0, recovery: 0 },
                        recommendedAction: "Gunakan analisis akar masalah untuk menentukan apakah Anda butuh teknologi baru, atau hanya perlu mengatur teknologi yang ada dengan lebih baik."
                    }
                ]
            },
            {
                id: "stage_7_5",
                stage: 7,
                stageTitle: "Stage 7.5: The Way Forward",
                title: "Rencana Aksi 30-Hari",
                context: "Manajemen pusat telah menerima laporan 'Lessons Learned' Anda.",
                scenarioText: "Insiden di kapal ini terjadi karena serangkaian kelemahan: (1) Vendor menggunakan VPN tanpa MFA, (2) Folder Dokumen Kargo dibiarkan terbuka untuk semua kru (tidak ada Least Privilege), dan (3) Pemulihan tertunda karena data backup belum pernah diuji.\n\nManajemen meminta Anda memilih paket '30-Day Priority Action Plan'.",
                question: "Kombinasi 3 Action Plan mana yang paling efektif menyasar secara LANGSUNG akar masalah teknis di atas?",
                tags: ["Action Plan", "Cyber Resilience", "Strategy"],
                frameworkFunction: "Protect",
                trainerPoints: ["Tekankan kesimpulan bahwa Keamanan Siber harus menjadi Enabler (Pendorong) bisnis, bukan penghambat.", "Rangkum siklus NIST CSF: Identify (Aset), Protect (MFA), Detect (Log), Respond (Isolasi), Recover (Restore Test)."],
                options: [
                    {
                        id: "s7_5_optA",
                        label: "[1] Wajibkan MFA untuk VPN, [2] Review Izin Folder Kargo, [3] Lakukan Uji Coba Restore Backup secara riil.",
                        feedbackType: "good",
                        explanation: "Pilihan Luar Biasa! Ini adalah prioritas yang sangat akurat. Ketiga langkah teknis ini langsung menutup kerentanan penyebab insiden utama Anda.\n\nSiklus Cyber Resilience Anda kini lengkap: Anda Mengenali (Identify) risiko vendor, Melindungi (Protect) lewat MFA & Hak Akses, Mendeteksi (Detect) insiden dengan log, Merespons (Respond) dengan pengisolasian, dan Memulihkan (Recover) operasi dari backup yang tervalidasi.",
                        scoreDelta: { security: +20, operation: +15, compliance: +15, recovery: +20 },
                        recommendedAction: "Ketahanan Siber (Cyber Resilience) bukan berarti kapal tidak akan pernah diserang, melainkan kemampuan kapal untuk bertahan, beradaptasi, dan pulih dengan cepat dari serangan siber."
                    },
                    {
                        id: "s7_5_optB",
                        label: "[1] Jalankan Phishing Awareness, [2] Buat Daftar Kontak Darurat, [3] Buat Evidence Pack.",
                        feedbackType: "risky",
                        explanation: "Kurang Tepat. Ketiga hal ini (Administratif) memang baik, namun gagal mengatasi masalah TEKNIS utama (VPN yang bobol, folder yang terbuka, dan backup yang tidak teruji). Perbaikan teknis harus diutamakan.",
                        scoreDelta: { security: +5, operation: 0, compliance: +5, recovery: +5 },
                        recommendedAction: "Seimbangkan kontrol Administratif (kebijakan/pelatihan) dengan kontrol Teknis (konfigurasi sistem)."
                    },
                    {
                        id: "s7_5_optC",
                        label: "[1] Matikan VPN sepenuhnya, [2] Hapus Shared Folder, [3] Format ulang semua server pelabuhan.",
                        feedbackType: "dangerous",
                        explanation: "Sangat Merusak Bisnis! Tindakan ini ekstrem dan akan mematikan kemampuan operasi bongkar muat dan pemeliharaan kapal. Keamanan siber hadir untuk MELINDUNGI operasional bisnis, bukan MENGHENTIKANNYA.",
                        scoreDelta: { security: -10, operation: -25, compliance: -15, recovery: -20 },
                        recommendedAction: "Penerapan keamanan siber maritim harus selalu selaras dan proporsional dengan kebutuhan kelancaran operasional kapal (Business Enabler)."
                    },
                    {
                        id: "s7_5_optD",
                        label: "[1] Integrasikan Log VPN ke SIEM, [2] Review akses vendor, [3] Wajibkan MFA.",
                        feedbackType: "risky",
                        explanation: "Berisiko karena kurang komprehensif. Pilihan ini sangat fokus menambal akses masuk (VPN), tetapi melupakan lapisan pertahanan mendalam (Defense in Depth) di sisi perlindungan data internal (Folder) dan kesiapan pemulihan (Restore Test).",
                        scoreDelta: { security: +10, operation: +5, compliance: +5, recovery: 0 },
                        recommendedAction: "Perhatikan seluruh lapisan NIST CSF (Protect, Detect, Recover), jangan hanya terpaku pada satu area."
                    }
                ]
            }
        ];
