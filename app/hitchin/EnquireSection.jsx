"use client";
import { useState } from "react";

export default function EnquiriesSection({ location }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Only allow digits and max 10 characters
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError("Please provide your name and phone number.");
      return;
    }
    if (formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const emailTargets = {
      hitchin: process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL_HITCHIN,
      stevenage: process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL_STEVENAGE,
    };
    const emailTarget = emailTargets[location?.toLowerCase()];
    const sheetUrls = {
      hitchin: process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL_HITCHIN,
      stevenage: process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL_STEVENAGE,
    };
    const sheetUrl = sheetUrls[location?.toLowerCase()];

    try {
      // 1. Google Sheets Submission
      if (sheetUrl) {
        await fetch(sheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Date: new Date().toLocaleString(),
            Location: location,
            Name: formData.name,
            Phone: formData.phone,
            Guests: formData.guests,
            EventDate: formData.date,
            EventTime: formData.time,
            Details: formData.details
          }),
        });
      } else {
        console.warn("Google Sheet URL for this location is not configured in .env.");
      }

      // 2. FormSubmit (Email) Submission
      if (emailTarget) {
        await fetch(`https://formsubmit.co/ajax/${emailTarget}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            Location: location,
            _subject: `New Event Enquiry - ${location}`,
            _captcha: "false",
          }),
        });
      } else {
        console.warn(`FormSubmit email for ${location} is not configured in .env.`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to send inquiry. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-[90%] md:w-[88%] bg-black min-h-screen mx-auto md:ml-[7vw] mt-[10vw] md:mt-[7vw] rounded-[4vw] md:rounded-[1.4vw] text-white font-['Share_Tech'] flex flex-col md:flex-row overflow-hidden" style={{ border: "1px solid #1F2739" }}>

      {/* LEFT SIDE */}
      <div className="w-full md:w-[29vw] border-b md:border-b-0 md:border-r border-[#1F2937] px-[8vw] md:px-[4vw] py-[8vw] md:py-[4vw] flex flex-col justify-start bg-[#121212]">

        <svg className="w-[60vw] md:w-[230px] h-auto md:h-[38px] max-w-[230px]" viewBox="0 0 230 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.827844 25.5601L0.575844 24.6601V19.7281L0.287844 17.8561V16.4521L0.575844 15.8041L0.395844 15.3361L0.287844 13.7521L-0.000156164 13.2481L0.359844 10.9801L-0.000156164 10.2601L0.287844 9.28805V6.87605L0.395844 6.12005V4.10405L0.575844 3.49205L0.359844 2.98805L0.683844 1.33205L1.69184 1.00805H2.73584L3.20384 0.828054L5.18384 1.04405L5.57984 0.828054L6.80384 0.720053L7.12784 0.540054H10.3678L12.5998 0.720053H13.0678L13.7158 1.00805H14.0038L14.6518 1.62005V2.84405L14.0038 3.49205H13.5358L13.3558 3.31205L13.0678 3.49205H12.3118L11.6638 3.78005L9.61184 3.63605L9.43184 3.78005H8.67584L7.59584 3.96005H7.27184L6.80384 4.10405H4.21184L3.85184 4.24805L3.49184 4.10405L3.67184 7.23605L3.85184 7.52405V8.35205L3.67184 8.64005L3.85184 8.92805V9.86405L4.49984 10.5121H5.43584L5.72384 10.6921H8.20784L8.96384 10.9801H9.32384L9.89984 11.2681L13.0678 11.0161L13.7158 11.3761L14.1838 12.0601L14.0038 13.2841H13.7158L13.3558 13.4641H10.7278L10.2598 13.7521H8.38784L7.45184 14.0761L6.04784 14.2201H4.31984L4.03184 14.4001L3.56384 14.5081V14.8681L3.13184 15.6241L3.38384 16.6681L3.09584 17.8561L3.38384 18.1441L3.20384 18.3241L3.45584 19.5481L3.20384 19.7281L3.49184 20.3041L3.20384 21.7081L3.38384 22.0321V22.3561L3.67184 22.6801L3.92384 23.1121L6.80384 23.2561L7.16384 23.1121L7.91984 23.2561H11.1958L11.6638 23.4361H14.2918L14.6518 23.7241L14.7598 24.6601L14.5798 25.5961H14.0038L13.7158 25.7761H8.85584L7.91984 26.0641H7.59584L6.80384 26.2441L6.19184 26.0641L3.95984 26.3161L1.33184 26.0641L0.827844 25.5601ZM20.4408 24.9121L20.3328 24.7321V23.9761L20.0448 22.8241L20.3328 21.4561L20.1528 21.2761V19.1161L19.9728 18.5041V17.8561L19.8648 17.3881V8.82005L19.9728 8.24405L19.8648 7.88405V3.49205L19.6488 1.94405L19.9728 1.18805L20.4408 0.864054H22.2048L22.6728 1.33205L22.9608 1.98005L23.1408 2.08805L23.2488 2.44805L24.2568 3.85205L25.1568 5.54405L25.3008 6.01205L25.7688 6.48005L26.7048 8.35205L27.0288 8.82005L27.1728 9.28805L27.4968 9.75605L27.9648 10.6921L28.5408 11.3041L29.4768 13.6441L29.8368 14.1121L30.4128 15.4081L30.7728 15.8761L30.8808 16.1641L31.2408 16.6321V16.8121L31.7088 17.2801H32.4648V16.4521L32.6448 16.3441V13.1761L32.4648 12.8881V10.3681L32.6448 10.2241V8.53205L32.4648 7.77605V6.19205L32.2848 5.14805L32.4648 4.60805L32.6448 2.91605V1.11605L33.1128 0.864054H34.0488L34.8048 1.29605V4.32005L34.9848 5.25605V6.66005L35.1648 8.56805L34.9848 9.46805V10.3681L34.7328 10.6201L34.9848 11.0161V11.5921L35.3808 13.3561L34.9128 16.8481L35.1648 17.5681L34.9848 18.9721L35.2728 19.5841V24.5521L34.5168 25.3801H34.2288L33.1488 25.5601L32.3568 25.2721L31.9968 24.5521H31.8888V24.2641L31.5288 23.7961V23.4361L30.5928 21.7441L30.4128 21.5641L30.3048 21.1321L29.9448 20.9881L29.6568 20.1961L29.1888 19.4401L28.9008 18.7921L27.3168 16.4521L27.1728 15.9841L26.8488 15.5161L26.5608 14.5801L26.3808 14.4721L26.2368 14.1121L25.8048 13.7161L24.5448 11.4841L24.3648 11.0161L23.8968 10.2241L23.4288 9.28805H22.7808V10.8361L22.6728 11.7721L22.9608 14.4721L22.7808 15.5161L22.6728 15.8761L22.7808 15.9841V21.7441L22.6728 22.3921L22.7808 23.0401V24.0841L22.3128 25.6681H20.4408V24.9121ZM50.2058 26.7121L50.0978 26.6041V26.1361L49.6298 25.9561L49.2698 25.6681H47.4338L46.0658 25.8481L45.7418 25.6681H45.4538L44.6258 25.3081L44.5178 25.2001L43.4018 24.5521L43.1138 24.2641L42.1778 23.7961L40.7738 21.7081V20.9881L40.5938 20.8081V20.6641L39.9458 19.4401V18.7921L39.8378 18.5041V17.7481L39.6578 16.1641V11.3041L39.9458 8.38805V5.72405L40.5938 4.21205L41.8898 2.26805L44.0498 0.576053L46.0298 5.4121e-05H49.1618L50.5658 0.468055L52.2578 1.40405L53.5898 2.70005L53.9498 3.85205L54.2018 4.32005L54.5978 5.90405V6.55205L54.7778 7.77605V8.06405L54.8858 8.38805V9.14405L54.5978 9.46805L54.9938 9.68405L54.7778 9.90005L54.8858 10.0801V17.1001L54.5978 18.6841V19.4401L54.4178 20.1961V20.5201L54.1298 21.1321L53.9498 21.2761V21.7441L52.7258 23.7961H52.5098L52.0778 24.5521L51.8978 24.7321L52.0778 25.9561L52.7258 27.1801V27.8281L52.2578 28.2961H51.3218L50.9258 28.0441L50.2058 26.7121ZM46.8218 22.6801L47.1458 22.5001H47.2898L47.9018 22.2121L48.0458 21.9241L47.7578 21.5641V20.3401L47.6138 20.0521V19.5841L47.4338 19.2601L47.6138 19.1161L47.8298 18.6841L49.0538 18.4321L49.4498 18.7921L50.0978 19.1161L50.6738 20.3401H51.1418L51.7898 19.0801L51.6098 18.2161L51.9698 17.5681V15.8761L52.0778 15.0481V13.3561L52.3658 11.6641L52.0778 8.53205V7.30805L50.9618 4.78805L49.7378 3.56405L48.8378 3.27605L48.5138 2.91605H46.0298L44.0498 4.24805L43.1498 6.08405L42.9338 7.59605L42.7538 8.38805V13.3561L42.6458 13.8241V17.1001L42.7538 19.1161L42.9338 19.4401L43.2218 20.3401L44.9138 22.3921L46.8218 22.6801ZM65.2828 26.0641L62.5468 25.3081L60.9268 24.1921L60.4588 23.2561L59.7748 22.1761L59.5228 21.1321L59.3428 17.1361L59.5228 15.2281L59.3068 13.5361L59.5228 12.2041V2.70005L59.9908 1.00805L60.7468 0.720053H61.8628L62.4388 1.29605V3.02405L62.6188 3.49205V9.39605L62.4388 10.3321V13.7521L62.6188 14.4721L62.3308 16.5241L62.6188 17.0281V19.0801L62.7988 19.7281V20.1961L63.0868 21.1321L63.2668 21.2401L63.6628 21.8881L65.0668 22.9321L66.5068 23.2561H68.8468L70.0708 22.6801L70.2508 22.5001L70.7908 22.2121L71.8348 20.7001V20.1961L72.1228 19.8361V17.8561L72.3388 17.6041L72.1228 17.3881V14.4001L72.4108 13.8961L72.1228 11.4481V10.3321L72.0148 10.2241V7.52405L71.6548 6.30005L71.8708 6.08405L71.6548 5.83205L71.8348 4.71605V2.08805L72.4108 0.864054L73.1668 0.648054L74.5708 0.864054L74.9308 2.23205L74.7508 4.14005L74.9308 4.89605V7.52405L74.8228 10.0441L74.4628 11.5921V12.6721L74.8228 14.2201V15.8041L74.4628 18.3241L74.6428 18.7921L74.4628 19.0801V20.4841L74.1748 22.0321L73.4188 23.6161L72.1228 24.8401L71.8348 25.0201L71.4748 25.3801L70.4308 25.5961L70.0708 25.7761H69.6028L69.3148 25.9561H68.8468L67.9108 26.2441H66.8308L66.3628 26.0641H65.2828ZM79.5317 24.7321L79.7837 23.5801L80.7557 23.1481H82.1597L82.5197 23.3281L83.3837 23.1481H84.4997L85.7237 22.8241V18.0361L85.6157 17.4241V16.5241L85.2917 15.3001L85.6157 13.0681V10.2601L85.3637 9.00005L85.7237 7.92005V5.43605L85.6157 4.68005V4.21205L85.4357 4.03205L85.2557 3.56405L84.9677 3.27605L83.7437 3.45605H80.5757L79.9997 3.09605H79.6397L79.2437 1.98005L79.7837 0.936053H79.9997L80.2877 0.648054H80.9357L82.1597 0.468055H93.1757L94.1117 0.936053L94.3997 2.05205L94.1117 2.84405L93.5357 3.27605L93.0677 3.09605L92.7077 3.27605H90.7277L89.1437 3.56405L88.9637 3.74405L88.6757 3.92405V5.76005L88.8557 5.90405L88.5317 6.55205V6.84005L88.6757 7.02005V8.85605L88.8557 9.50405V13.7161L89.1077 16.2001L88.6397 17.0281L88.8557 17.5681V18.2161L88.5317 18.5401L88.6757 19.7641V22.6801L88.9637 22.5721L89.1437 22.6801V23.0401L89.4317 22.8601H90.2597L91.3037 22.6801L91.6637 22.8601H93.0677L93.6437 23.1481H94.0037L94.5797 23.7961V25.3801H94.2917L93.8237 25.6681H90.0797L89.6117 25.4881H88.3877L87.3437 25.3081L86.6597 25.6681H84.0317L83.8517 25.4881H81.6917L80.3597 25.7401L79.8917 25.4161L79.5317 24.7321ZM99.0727 19.5841L98.8567 17.0281L99.2167 16.2721L98.9647 15.2281V13.8241L98.6767 11.5921L98.9647 9.32405V8.38805L99.0727 8.10005V4.39205L99.5407 1.87205V1.18805L100.009 0.936053H101.413L102.997 0.756053H109.513L112.033 1.40405L113.653 3.02405L114.193 4.68005V4.96805L114.373 5.14805V5.61605L114.553 5.90405V6.37205L114.697 7.05605L114.553 7.92005L114.373 8.24405V9.50405L113.833 10.9801L112.789 12.4201L110.917 13.8961V14.9401L111.277 15.8761L111.565 16.9921L111.745 17.2801L111.961 18.7201L112.969 21.3481V21.9241L113.437 22.3921L114.085 24.2641V24.9481L113.617 25.2001L113.437 25.3801H112.501L112.033 24.9121L111.853 24.6241L111.385 24.1561V23.3281L111.277 23.2201V22.7521L110.917 22.3921V21.8161L110.629 21.4561V20.9881L110.449 20.8801V20.7001L109.981 19.7641L109.693 19.0081L109.513 18.6841L109.045 17.2801L108.469 16.1641L108.073 14.9761L107.353 14.2921H103.645L102.529 14.6881L102.241 15.2281V15.6961L101.953 16.7401L102.241 17.2801V17.8921L102.061 18.2161L101.773 21.4561V22.7521L101.593 23.3281V24.4441L101.233 25.1281L100.081 25.4161L99.0727 25.1281V19.5841ZM107.641 11.0161L109.477 10.8001L110.917 9.86405L111.385 8.56805V8.24405L111.565 7.77605V6.37205L111.313 5.07605L109.873 3.56405H109.225L108.469 3.45605H107.641L105.625 3.27605H102.241L101.989 4.03205L102.349 7.63205V9.79205L102.709 10.4401L103.285 10.7281H103.465L104.113 10.9081H106.885L107.641 11.0161ZM119.118 24.7321L119.37 23.5801L120.342 23.1481H121.746L122.106 23.3281L122.97 23.1481H124.086L125.31 22.8241V18.0361L125.202 17.4241V16.5241L124.878 15.3001L125.202 13.0681V10.2601L124.95 9.00005L125.31 7.92005V5.43605L125.202 4.68005V4.21205L125.022 4.03205L124.842 3.56405L124.554 3.27605L123.33 3.45605H120.162L119.586 3.09605H119.226L118.83 1.98005L119.37 0.936053H119.586L119.874 0.648054H120.522L121.746 0.468055H132.762L133.698 0.936053L133.986 2.05205L133.698 2.84405L133.122 3.27605L132.654 3.09605L132.294 3.27605H130.314L128.73 3.56405L128.55 3.74405L128.262 3.92405V5.76005L128.442 5.90405L128.118 6.55205V6.84005L128.262 7.02005V8.85605L128.442 9.50405V13.7161L128.694 16.2001L128.226 17.0281L128.442 17.5681V18.2161L128.118 18.5401L128.262 19.7641V22.6801L128.55 22.5721L128.73 22.6801V23.0401L129.018 22.8601H129.846L130.89 22.6801L131.25 22.8601H132.654L133.23 23.1481H133.59L134.166 23.7961V25.3801H133.878L133.41 25.6681H129.666L129.198 25.4881H127.974L126.93 25.3081L126.246 25.6681H123.618L123.438 25.4881H121.278L119.946 25.7401L119.478 25.4161L119.118 24.7321ZM139.379 25.5601L139.127 24.6601V19.7281L138.839 17.8561V16.4521L139.127 15.8041L138.947 15.3361L138.839 13.7521L138.551 13.2481L138.911 10.9801L138.551 10.2601L138.839 9.28805V6.87605L138.947 6.12005V4.10405L139.127 3.49205L138.911 2.98805L139.235 1.33205L140.243 1.00805H141.287L141.755 0.828054L143.735 1.04405L144.131 0.828054L145.355 0.720053L145.679 0.540054H148.919L151.151 0.720053H151.619L152.267 1.00805H152.555L153.203 1.62005V2.84405L152.555 3.49205H152.087L151.907 3.31205L151.619 3.49205H150.863L150.215 3.78005L148.163 3.63605L147.983 3.78005H147.227L146.147 3.96005H145.823L145.355 4.10405H142.763L142.403 4.24805L142.043 4.10405L142.223 7.23605L142.403 7.52405V8.35205L142.223 8.64005L142.403 8.92805V9.86405L143.051 10.5121H143.987L144.275 10.6921H146.759L147.515 10.9801H147.875L148.451 11.2681L151.619 11.0161L152.267 11.3761L152.735 12.0601L152.555 13.2841H152.267L151.907 13.4641H149.279L148.811 13.7521H146.939L146.003 14.0761L144.599 14.2201H142.871L142.583 14.4001L142.115 14.5081V14.8681L141.683 15.6241L141.935 16.6681L141.647 17.8561L141.935 18.1441L141.755 18.3241L142.007 19.5481L141.755 19.7281L142.043 20.3041L141.755 21.7081L141.935 22.0321V22.3561L142.223 22.6801L142.475 23.1121L145.355 23.2561L145.715 23.1121L146.471 23.2561H149.747L150.215 23.4361H152.843L153.203 23.7241L153.311 24.6601L153.131 25.5961H152.555L152.267 25.7761H147.407L146.471 26.0641H146.147L145.355 26.2441L144.743 26.0641L142.511 26.3161L139.883 26.0641L139.379 25.5601ZM163.528 25.8841L162.628 25.5961L162.448 25.4161H161.8L160.684 24.9481L160.576 24.8401L159.928 24.5161L159.46 23.5801L158.992 23.1121V22.9681L158.308 21.9961L158.02 20.7721L158.344 19.3681L158.704 19.1881L158.992 18.9001H159.46L159.64 19.0801L160.216 19.2601V20.1241L161.44 22.1761L162.916 23.1121L163.672 23.4361L163.852 23.5801H163.996L164.464 23.7241H166.444L166.624 23.9041H167.092L167.272 23.7241L168.1 23.5081L169.144 23.1121L169.252 22.8241L170.008 22.4641L170.188 22.0321L170.548 21.7081V21.5281L171.016 19.6561V19.1881L171.196 19.0801L171.016 18.7201V17.8921L169.9 16.2721L168.316 15.3361L167.38 14.9761L166.804 14.6881L163.78 13.6441L162.448 12.8881L161.512 12.4921L160.18 11.5561L159.064 9.32405L158.704 7.52405V5.47205L159.172 4.10405L160.216 2.41205L161.512 1.47605L161.62 1.29605L162.916 0.648054L163.852 0.540054L164.356 0.288053L167.38 0.540054L169.612 1.29605L170.188 1.58405L171.016 1.87205L172.168 2.62805L173.392 4.50005L173.644 5.83205V7.05605L172.888 7.81205L172.24 8.17205H171.304L170.656 7.45205L170.152 5.54405L168.784 3.78005L166.624 3.38405L163.888 3.85205L162.772 4.60805L162.088 5.94005V6.30005L161.98 6.58805V7.77605L162.556 9.28805L163.888 10.1521L165.076 10.6201L165.868 10.8001L168.676 11.7361H169.144L169.432 12.0241H169.9L170.836 12.4921L173.068 14.6881L173.176 15.1561L173.536 15.6241V15.9121L173.644 16.3801V16.7401L173.824 16.8481L174.148 18.6841L173.968 18.9001V20.5921L173.824 20.9521V21.7081L173.536 22.1761L173.284 22.8601L171.772 24.3721L171.484 24.5161L171.016 24.9481L168.676 25.7761H168.028L167.74 26.0641H165.4L163.996 25.8841H163.528Z" fill="white" />
        </svg>
        <p className="text-white/60 text-[3.5vw] md:text-[.95vw] mb-[8vw] md:mb-[5vw] font-extralight font-mono leading-relaxed mt-[4vw] md:mt-[2vw]">
          <strong>
            Planning a celebration?
          </strong>
          <br />
          {location === 'stevenage' ? (
            <>Our Stevenage location offers a spacious setting designed for group bookings and vibrant social gatherings. Host your next event at the home of Peckers.</>
          ) : (
            <>From landmark birthdays to local gatherings, host your next event at the home of seriously good chicken.</>
          )}
        </p>

        <div className="flex flex-col mt-[-2.5vw] gap-[4vw] md:gap-[1.9vw]">

          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg className="w-[8vw] md:w-[34px] h-[9vw] md:h-[38px] min-w-[8vw] md:min-w-[34px]" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM21.3574 31.2188V7.38281C20.9355 7.88672 20.3555 8.29688 19.6172 8.61328C18.8789 8.91797 18.1816 9.07031 17.5254 9.07031V4.13086C18.1465 4.03711 18.8145 3.83789 19.5293 3.5332C20.2441 3.2168 20.9062 2.78906 21.5156 2.25C22.1367 1.69922 22.6113 1.03711 22.9395 0.263672H27.9141V31.2188H21.3574Z" fill="#374151" />
            </svg>
            <span className="text-[5vw] md:text-[1.8vw] tracking-wider font-peakers">BIRTHDAY & EVENTS</span>
          </div>

          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg className="w-[10vw] md:w-[40px] h-[9vw] md:h-[36px] min-w-[10vw] md:min-w-[40px]" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM18.1758 31.2188V29.7422C18.1758 28.207 18.4102 26.8301 18.8789 25.6113C19.3594 24.3809 19.9746 23.2441 20.7246 22.2012C21.4746 21.1465 22.2656 20.1152 23.0977 19.1074C23.9062 18.123 24.6738 17.1152 25.4004 16.084C26.1387 15.041 26.7363 13.916 27.1934 12.709C27.6621 11.4902 27.8965 10.125 27.8965 8.61328C27.8965 7.88672 27.7852 7.26562 27.5625 6.75C27.3516 6.22266 26.9062 5.95898 26.2266 5.95898C25.1953 5.95898 24.6797 6.87891 24.6797 8.71875V12.498H18.1758C18.1641 12.2285 18.1465 11.9238 18.123 11.584C18.1113 11.2441 18.1055 10.916 18.1055 10.5996C18.1055 8.37305 18.3398 6.48633 18.8086 4.93945C19.2773 3.38086 20.1035 2.19727 21.2871 1.38867C22.4824 0.568359 24.1582 0.158203 26.3145 0.158203C28.8809 0.158203 30.873 0.878906 32.291 2.32031C33.7207 3.76172 34.4355 5.81836 34.4355 8.49023C34.4355 10.3066 34.2012 11.9004 33.7324 13.2715C33.2637 14.6309 32.6426 15.873 31.8691 16.998C31.0957 18.1113 30.2461 19.2246 29.3203 20.3379C28.6641 21.123 28.0254 21.9258 27.4043 22.7461C26.7949 23.5664 26.2559 24.4453 25.7871 25.3828H34.2246V31.2188H18.1758Z" fill="#374151" />
            </svg>
            <span className="text-[5vw] md:text-[1.8vw] tracking-wider font-peakers">SOCIAL GATHERINGS</span>
          </div>

          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg className="w-[9vw] md:w-[38px] h-[8.5vw] md:h-[36px] min-w-[9vw] md:min-w-[38px]" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM25.5938 31.5703C22.8633 31.5703 20.877 30.8496 19.6348 29.4082C18.3926 27.9668 17.7715 25.793 17.7715 22.8867V19.6523H24.1172V22.9043C24.1172 23.7246 24.2168 24.4219 24.416 24.9961C24.627 25.5586 25.0898 25.8398 25.8047 25.8398C26.5312 25.8398 26.9941 25.5352 27.1934 24.9258C27.3926 24.3047 27.4922 23.2969 27.4922 21.9023V21.1289C27.4922 20.0625 27.3105 19.1309 26.9473 18.334C26.5957 17.5371 25.8984 17.1387 24.8555 17.1387C24.7266 17.1387 24.6094 17.1445 24.5039 17.1562C24.4102 17.1562 24.3281 17.1621 24.2578 17.1738V11.6191C25.3242 11.6191 26.1387 11.3848 26.7012 10.916C27.2637 10.4355 27.5449 9.63867 27.5449 8.52539C27.5449 6.7793 27.041 5.90625 26.0332 5.90625C25.377 5.90625 24.9316 6.16406 24.6973 6.67969C24.4746 7.18359 24.3633 7.82812 24.3633 8.61328V9.54492H17.9648C17.9531 9.4043 17.9414 9.23437 17.9297 9.03516C17.9297 8.83594 17.9297 8.64258 17.9297 8.45508C17.9297 5.61914 18.5918 3.53906 19.916 2.21484C21.2402 0.890625 23.2676 0.228516 25.998 0.228516C31.2715 0.228516 33.9082 2.9707 33.9082 8.45508C33.9082 9.97852 33.7031 11.2383 33.293 12.2344C32.8828 13.2188 32.1211 13.9102 31.0078 14.3086C31.8867 14.7305 32.5371 15.2695 32.959 15.9258C33.3809 16.582 33.6562 17.3965 33.7852 18.3691C33.9141 19.3418 33.9785 20.5195 33.9785 21.9023C33.9785 24.9961 33.3281 27.3809 32.0273 29.0566C30.7383 30.7324 28.5938 31.5703 25.5938 31.5703Z" fill="#374151" />
            </svg>
            <span className="text-[5vw] md:text-[1.8vw] tracking-wider font-peakers">PRIVATE HIRE</span>
          </div>

          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg className="w-[8vw] md:w-[34px] h-[9vw] md:h-[38px] min-w-[8vw] md:min-w-[34px]" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM21.3574 31.2188V7.38281C20.9355 7.88672 20.3555 8.29688 19.6172 8.61328C18.8789 8.91797 18.1816 9.07031 17.5254 9.07031V4.13086C18.1465 4.03711 18.8145 3.83789 19.5293 3.5332C20.2441 3.2168 20.9062 2.78906 21.5156 2.25C22.1367 1.69922 22.6113 1.03711 22.9395 0.263672H27.9141V31.2188H21.3574Z" fill="#374151" />
            </svg>
            <span className="text-[5vw] md:text-[1.8vw] tracking-wider font-peakers">OUTSIDE CATERING</span>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[57vw] px-[6vw] md:px-[4vw] py-[8vw] md:py-[3vw] flex flex-col font-peakers bg-[#000000]">

        <div className="flex items-center gap-[4vw] mb-[6vw] md:mb-[2vw]">
          <h2 className="text-[7vw] md:text-[2.6vw] tracking-[0.05vw] font-bold whitespace-nowrap">
            GET IN TOUCH
          </h2>
          <div className="flex-1 h-[2px] bg-[#1F2937] w-[100%]"></div>
        </div>

        {/* FORM */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[6vw] md:gap-[2vw]">

            {/* NAME + PHONE */}
            <div className="flex flex-col md:flex-row gap-[6vw] md:gap-[2vw]">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[0.8vw] tracking-wide font-extralight font-mono text-white">
                  YOUR NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  disabled={isSubmitting}
                  className="bg-[#111111] text-[4vw] md:text-[1.1vw] border border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white placeholder-white/40 focus:outline-none disabled:opacity-50"
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[0.8vw] tracking-wide font-extralight text-white font-mono">
                  PHONE NO. <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  required
                  disabled={isSubmitting}
                  className="bg-[#111111] text-[4vw] md:text-[1.1vw] border border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white placeholder-white/40 focus:outline-none disabled:opacity-50"
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>

            {/* GUESTS + DATE + TIME */}
            <div className="flex flex-col md:flex-row gap-[6vw] md:gap-[2vw]">

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[0.8vw] tracking-widest font-extralight font-mono text-white">
                  GUESTS
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="Est."
                  disabled={isSubmitting}
                  className="bg-[#111111] border text-[4vw] md:text-[1.1vw] border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white placeholder-white/40 focus:outline-none transition disabled:opacity-50"
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[0.8vw] tracking-wide text-white font-mono font-extralight">
                  DATE
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="mm/dd/yy"
                  disabled={isSubmitting}
                  className="bg-[#111111] border text-[4vw] md:text-[1.1vw] border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white/80 focus:outline-none disabled:opacity-50"
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[0.8vw] font-extralight font-mono tracking-widest text-white">
                  TIME
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="--:-- --"
                  disabled={isSubmitting}
                  className="bg-[#111111] border text-[4vw] md:text-[1.4vw] border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white/80 focus:outline-none focus:border-[#1F2937] transition disabled:opacity-50"
                />
              </div>

            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-[2vw] md:gap-2">
              <label className="text-[3vw] md:text-[0.8vw] font-mono font-extralight tracking-widest text-white">
                DETAILS
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your event (e.g., Birthday, Party size)... "
                disabled={isSubmitting}
                style={{ fontFamily: 'monospace' }}
                className="bg-[#111111] border font-extralight text-[4vw] md:text-[1.2vw] border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white placeholder-white/40 resize-none focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* BUTTON AND ERROR */}
            <div className="mt-[4vw] md:mt-[2vw] flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-white flex justify-center items-center gap-3 text-black font-mono font-bold px-[6vw] md:px-[3.5vw] py-[4vw] md:py-5 rounded-[2vw] md:rounded-[.6vw] text-[4vw] md:text-[1.45vw] tracking-widest hover:bg-white/90 transition shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  "SUBMIT INQUIRY"
                )}
              </button>
              {error && <p className="text-red-500 font-mono text-[3vw] md:text-[1vw] uppercase">{error}</p>}
            </div>

          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-[10vw] md:py-[5vw] animate-in fade-in zoom-in duration-700">
            <div className="w-[20vw] h-[20vw] md:w-[6vw] md:h-[6vw] bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-[8vw] md:text-[3vw] font-bold mb-3 font-peakers tracking-wider text-white">
              INQUIRY RECEIVED
            </h3>
            <p className="text-[4vw] md:text-[1.1vw] font-mono font-extralight text-white/60 max-w-[80%] mb-8 leading-relaxed">
              Thank you for getting in touch. Our team will review your details and get back to you shortly to help plan your event.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", phone: "", guests: "", date: "", time: "", details: "" });
              }}
              className="text-[#9CA3AF] hover:text-white transition-colors text-[3.5vw] md:text-[1vw] font-mono uppercase underline decoration-1 underline-offset-4"
            >
              Submit Another Enquiry
            </button>
          </div>
        )}
      </div>

    </section>
  );
}