// Toàn bộ nội dung chữ của website. Sửa nội dung ở đây, không cần đụng vào giao diện.

export const PHONE = "0968273868";
export const PHONE_DISPLAY = "0968.273.868";
export const EMAIL = "aidatnq6@gmail.com";
export const ZALO_URL = `https://zalo.me/${PHONE}`;
export const FACEBOOK_URL = "https://www.facebook.com/nguyenquangdat868/";
export const FACEBOOK_HANDLE = "nguyenquangdat868";
export const PROFILE_URL =
  "https://drive.google.com/file/d/1MLLqjLspUlHdWlcrBmgMdcjZ2mHHeiCh/view?usp=drive_link";

export const NAME = "Nguyễn Quang Đạt";
export const ROLE = "Đồng sáng lập – Công ty TNHH Dịch vụ Giải pháp Vi-Tech";

export const NAV = [
  { href: "#ve-toi", label: "Giới thiệu" },
  { href: "#hanh-trinh", label: "Hành trình" },
  { href: "#linh-vuc", label: "Năng lực" },
  { href: "#cach-lam-viec", label: "Cách làm việc" },
  { href: "#lien-he", label: "Kết nối" },
];

export const STATS = [
  { value: 15, label: "Chữ ký số & Hóa đơn điện tử", variant: "hero" },
  { value: 8, label: "Tại Viettel Đà Nẵng", variant: "normal" },
  { value: 10, label: "Nghiên cứu đầu tư tài chính", variant: "normal" },
  { value: 5, label: "Nghiên cứu chuyên sâu về AI", variant: "wide" },
] as const;

export const TRAINING = [
  { title: "AI", desc: "Google, Softech, ABM và nhiều tổ chức khác tại Việt Nam" },
  { title: "Đầu tư tài chính", desc: "AFA Capital, Davinci Academy, DHE Academy" },
];

export const JOURNEY = [
  {
    title: "Học vấn",
    lines: [
      "Kỹ sư Điện tử Viễn thông, Đại học Bách khoa Đà Nẵng",
      "Cử nhân Quản trị Kinh doanh, Trường Đại học Mở Hà Nội",
    ],
  },
  {
    title: "Viettel Đà Nẵng (8 năm)",
    lines: ["Kỹ sư CNTT → Kỹ sư dịch vụ Giải pháp → Phụ trách đào tạo Bán hàng & Kỹ thuật"],
  },
  {
    title: "Vi-Tech",
    lines: [
      "Đồng sáng lập. Cung cấp Chữ ký số, Hóa đơn điện tử, Phần mềm Bảo hiểm xã hội, Phần mềm khấu trừ thuế TNCN",
    ],
  },
  {
    title: "Hiện nay",
    lines: ["Ứng dụng AI Agent vào vận hành. Mô hình tinh gọn, kết hợp mạng lưới đại lý"],
    now: true,
  },
];

export type Service = {
  no: string;
  tag?: string;
  title: string;
  desc: string;
  basis?: { k: string; v: string }[];
  gain: string;
};

export const SERVICES: Service[] = [
  {
    no: "01",
    title: "Thủ tục số cho doanh nghiệp",
    desc: "Cấp mới và gia hạn Chữ ký số, Hóa đơn điện tử, Phần mềm Bảo hiểm xã hội, Phần mềm khấu trừ thuế TNCN. Dành cho hộ kinh doanh, doanh nghiệp SME, tập đoàn, cơ quan, trường học.",
    gain: "làm đúng quy định, đúng hạn, có người hỗ trợ khi cần.",
  },
  {
    no: "02",
    tag: "Đang triển khai",
    title: "Tự động hóa vận hành bằng AI",
    desc: "Chuẩn hóa quy trình, đưa dữ liệu vào một nơi, rồi dùng AI Agent cho các việc lặp lại như chăm sóc khách hàng qua Zalo, nhắc gia hạn, báo cáo.",
    gain: "giảm việc thủ công, ra quyết định dựa trên dữ liệu.",
  },
  {
    no: "03",
    tag: "Sắp triển khai",
    title: "Đào tạo AI và kiến thức đầu tư tài chính",
    desc: "Chương trình dành cho chủ doanh nghiệp và nhân sự: ứng dụng AI vào công việc, nền tảng kiến thức đầu tư tài chính.",
    basis: [
      {
        k: "AI",
        v: "5 năm học qua các khóa đào tạo chuyên sâu của Google, Softech, ABM và nhiều tổ chức khác tại Việt Nam.",
      },
      {
        k: "Đầu tư tài chính",
        v: "10 năm đầu tư, học qua các khóa đào tạo chuyên sâu tại AFA Capital, Davinci Academy, DHE Academy.",
      },
    ],
    gain: "tự vận dụng được, không phụ thuộc người khác.",
  },
];

export const VALUES = [
  { title: "Thực chiến", desc: "Giải pháp phải chạy được trong điều kiện thật của doanh nghiệp, không chỉ đẹp trên giấy." },
  { title: "Kỷ luật", desc: "Đúng quy trình, đúng hạn, đúng cam kết." },
  { title: "Cầu thị", desc: "Lắng nghe trước, đề xuất sau. Mỗi doanh nghiệp một bài toán khác nhau." },
];

export const STEPS = [
  { title: "Lắng nghe", desc: "Hiểu nhu cầu và hiện trạng" },
  { title: "Đề xuất", desc: "Phương án phù hợp quy mô và ngân sách" },
  { title: "Triển khai", desc: "Cài đặt, hướng dẫn, chuẩn hóa" },
  { title: "Đồng hành", desc: "Hỗ trợ sau triển khai, nhắc gia hạn, cải tiến" },
];

// Phải trùng danh sách trong firestore.rules.
export const NEEDS = [
  "Chữ ký số",
  "Hóa đơn điện tử",
  "Phần mềm Bảo hiểm xã hội",
  "Phần mềm khấu trừ thuế TNCN",
  "Tự động hóa vận hành bằng AI",
  "Đào tạo AI và kiến thức đầu tư tài chính",
  "Khác",
] as const;
