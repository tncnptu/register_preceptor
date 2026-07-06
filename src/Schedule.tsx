import React from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Schedule({ onBack }: { onBack?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-slate-100 relative">
      {onBack && (
        <button 
          onClick={onBack}
          className="mb-6 flex items-center text-slate-500 hover:text-navy-600 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          กลับหน้าแรก
        </button>
      )}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-4">กำหนดการอบรมเชิงปฏิบัติการ</h2>
        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          “พยาบาลพี่เลี้ยงสู่คุณภาพการเรียนการสอน : N-PTU Preceptor Masterclass 2026”
        </p>
        <p className="text-slate-500 mt-2">ปีการศึกษา 2569 คณะพยาบาลศาสตร์ มหาวิทยาลัยปทุมธานี</p>
        <div className="mt-6 inline-flex items-center justify-center bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-medium border border-blue-100">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          วันที่ 25 – 26, 28 สิงหาคม และ 1 – 2 กันยายน พ.ศ. 2569 (08.00 น. – 17.00 น.)
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12">
        <DaySchedule 
          title="วันที่ 25 สิงหาคม 2569 (Day 1): Online" 
          items={[
            { time: "07.00 - 07.45 น.", topic: "ลงทะเบียนและประเมินความรู้ก่อนเข้าอบรม (Pre-test)" },
            { time: "07.45 - 08.00 น.", topic: "พิธีเปิด โดย ดร.ชนากานต์ ยืนยง อธิการบดีมหาวิทยาลัยปทุมธานี\nกล่าวรายงานโดย ผศ. ดร. วนิดา ดุรงค์ฤทธิชัย คณบดีคณะพยาบาลศาสตร์" },
            { time: "08.00 - 09.00 น.", topic: "ศิลปะการประเมินผลและสะท้อนคิด (Mastering Assessment & Constructive Feedback)\n1. การใช้เครื่องมือประเมินผลลัพธ์การเรียนรู้ให้เที่ยงตรง และเป็นมาตรฐานเดียวกัน", speaker: "ผศ.ดร.ชญาภรณ์ เอกธรรมสุทธิ์" },
            { time: "09.00 - 09.15 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "09.15 - 12.00 น.", topic: "2. จิตวิทยาคลินิก: เทคนิคการให้ข้อมูลย้อนกลับเชิงบวก (Constructive Feedback)", speaker: "ผศ.ดร.ชญาภรณ์ เอกธรรมสุทธิ์" },
            { time: "12.00 - 13.00 น.", topic: "รับประทานอาหารกลางวัน", isBreak: true },
            { time: "13.00 - 15.30 น.", topic: "ศิลปะการประเมินผลและสะท้อนคิด (ต่อ)\n3. ฝึกปฏิบัติออนไลน์: การออกแบบและวิเคราะห์ผลลัพธ์การเรียนรู้รายวิชาของภาคปฏิบัติ", speaker: "ผศ.ดร.ชญาภรณ์ เอกธรรมสุทธิ์" },
            { time: "15.30 - 15.45 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "15.45 - 17.00 น.", topic: "(ต่อ) 3. ฝึกปฏิบัติออนไลน์: การออกแบบและวิเคราะห์ผลลัพธ์การเรียนรู้รายวิชาของภาคปฏิบัติ", speaker: "ผศ.ดร.ชญาภรณ์ เอกธรรมสุทธิ์" },
          ]}
        />
        
        <DaySchedule 
          title="วันที่ 26 สิงหาคม 2569 (Day 2): Online" 
          items={[
            { time: "08.00 - 09.00 น.", topic: "บรรยายพิเศษ ในหัวข้อ \"The Next Gen Preceptor: ก้าวข้ามขีดจำกัด สู่การเป็นพยาบาลพี่เลี้ยงคุณภาพ\"", speaker: "ผศ.ดร.วนิดา ดุรงค์ฤทธิชัย" },
            { time: "09.00 - 09.15 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "09.15 - 12.00 น.", topic: "ถอดรหัสสมรรถนะพยาบาลยุคใหม่ (Core Competencies in Modern Healthcare)\n1. มาตรฐานหน่วยบริการสุขภาพและสถาบันบริการ\n2. เจาะลึกสมรรถนะวิชาชีพพยาบาลและการผดุงครรภ์ ในระบบบริการสุขภาพยุคใหม่", speaker: "ศ.ดร.นพวรรณ เปียซื่อ" },
            { time: "12.00 - 13.00 น.", topic: "รับประทานอาหารกลางวัน", isBreak: true },
            { time: "13.00 - 15.30 น.", topic: "พลิกโฉมการจัดการเรียนการสอนพยาบาล (Nursing Education Transformation)\n1. การสอนแบบมุ่งผลลัพธ์ (Outcome-Based Education: OBE): จากทฤษฎีสู่การปฏิบัติจริง\n2. ก้าวเดินตามมาตรฐานสากล (AUN-QA) ผ่านกระบวนการสอนคลินิก", speaker: "ผศ.ดร.วนิดา ดุรงค์ฤทธิชัย" },
            { time: "15.30 - 15.45 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "15.45 - 17.00 น.", topic: "The Next Gen Preceptor : ปลดล็อกศักยภาพพยาบาลพี่เลี้ยง\n1. ศาสตร์แห่งการเป็นพี่เลี้ยงและบทบาทแบบมืออาชีพ (Mentorship Role)\n2. คุณลักษณะเด่นของพยาบาลพี่เลี้ยงในการจัดการศึกษาสาขาพยาบาลศาสตร์", speaker: "ผศ.ดร.วนิดา ดุรงค์ฤทธิชัย" },
          ]}
        />

        <DaySchedule 
          title="วันที่ 28 สิงหาคม 2569 (Day 3): Online" 
          items={[
            { time: "08.00 - 09.00 น.", topic: "กลยุทธ์การสอนในยุคสังคมพลิกผัน (Disruptive Education Strategies)\n1. เข้าใจธรรมชาติการเรียนรู้ของผู้ใหญ่\n2. จากการเรียนรู้สู่กลยุทธ์การสอน", speaker: "รศ.ดร.ปณวัตร สันประโคน" },
            { time: "09.00 - 09.15 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "09.15 - 12.00 น.", topic: "ติดปีกทักษะศตวรรษที่ 21 ให้นักศึกษาพยาบาล\nAI & นวัตกรรม: ผู้ช่วยอัจฉริยะเพื่อการจัดการเรียนการสอนภาคปฏิบัติ", speaker: "รศ.ดร.ปณวัตร สันประโคน" },
            { time: "12.00 - 13.00 น.", topic: "รับประทานอาหารกลางวัน", isBreak: true },
            { time: "13.00 - 15.30 น.", topic: "การออกแบบการสอนคลินิกและชุมชนอย่างสร้างสรรค์ (Creative Clinical & Community Teaching)\n1. การประยุกต์ใช้กระบวนการพยาบาล (Nursing Process) อย่างเฉียบคม\n2. แผนการสอน (Teaching Plan) และแผนการนิเทศที่ทำได้จริง", speaker: "อ.พิสันต์ ประชาชู\nอ.สุรศักดิ์ มูลศรีสุข" },
            { time: "15.30 - 15.45 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "15.45 - 17.00 น.", topic: "เทคนิคการสอนแบบ Active Learning: Case Assignment, Clinical Conference และ Bedside Teaching", speaker: "อ.บังอร อยู่นาน\nพ.ต.อ.หญิง นพมาศ ขำสมบัติ" },
          ]}
        />

        <DaySchedule 
          title="วันที่ 1 กันยายน 2569 (Day 4): Online" 
          items={[
            { time: "08.00 - 10.00 น.", topic: "ก้าวข้ามขีดจำกัดวิชาชีพด้วยวิจัยจากการปฏิบัติงานสู่การสอนภาคปฏิบัติ", speaker: "อ.ดร.ภัทรพิชชา ครุฑางคะ" },
            { time: "10.00 - 10.15 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "10.15 - 12.00 น.", topic: "ผนึกกำลังสถาบันการศึกษาและแหล่งฝึกเพื่อพัฒนาคุณภาพบัณฑิตด้วยนวัตกรรมทางการพยาบาล", speaker: "อ.ดร.ภัทรพิชชา ครุฑางคะ" },
            { time: "12.00 - 13.00 น.", topic: "รับประทานอาหารกลางวัน", isBreak: true },
            { time: "13.00 - 15.30 น.", topic: "ถอดบทเรียนสู่การปฏิบัติ: การวางแผนการสอนทางคลินิก (Bridging Theory to Practice)\nเพื่อบูรณาการความรู้จากภาคทฤษฎีสู่การสอนในคลินิก", speaker: "ผศ.วรรณา มุ่งทวีเกียรติ\nผศ.ดร.เพ็ญศรี หงษ์พานิช\nอ.สาวิตรี แย้มศรีบัว\nอ.ฐิญาภัณณฑ์ ภูมิชัยวิวัฒน์\nพ.ท.หญิง นฤมล ทองวัชรไพบูลย์" },
            { time: "15.30 - 15.45 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "15.45 - 17.00 น.", topic: "(ต่อ) ถอดบทเรียนสู่การปฏิบัติ: การวางแผนการสอนทางคลินิก (Bridging Theory to Practice)\nเพื่อบูรณาการความรู้จากภาคทฤษฎีสู่การสอนในคลินิก", speaker: "ผศ.วรรณา มุ่งทวีเกียรติ\nผศ.ดร.เพ็ญศรี หงษ์พานิช\nอ.สาวิตรี แย้มศรีบัว\nอ.ฐิญาภัณณฑ์ ภูมิชัยวิวัฒน์\nพ.ท.หญิง นฤมล ทองวัชรไพบูลย์" },
          ]}
        />

        <DaySchedule 
          title="วันที่ 2 กันยายน 2569 (Day 5): Online" 
          items={[
            { time: "08.30 - 09.00 น.", topic: "ลงทะเบียนเข้าร่วมกิจกรรม Online" },
            { time: "09.00 - 10.00 น.", topic: "On-Line Workshop: ออกแบบการสอนจากผลลัพธ์การเรียนรู้\nของรายวิชาผ่านสถานการณ์จำลองและฝึกปฏิบัติทดลองสอน", speaker: "ผศ.ดร.ผุสดี ชูชีพ\nอ.มลิจันทร์ เกียรติสังวร\nอ.ดร.อมรศรี ยอดคำ\nอ.ดร.สำเนา นิลบรรพ์\nอ.ทิพภา ปุณสีห์" },
            { time: "10.00 - 10.15 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "10.15 - 12.00 น.", topic: "On-Line Workshop: ออกแบบการสอนจากผลลัพธ์การเรียนรู้\nของรายวิชาผ่านสถานการณ์จำลองและฝึกปฏิบัติทดลองสอน", speaker: "ผศ.ดร.ผุสดี ชูชีพ\nอ.มลิจันทร์ เกียรติสังวร\nอ.ดร.อมรศรี ยอดคำ\nอ.ดร.สำเนา นิลบรรพ์\nอ.ทิพภา ปุณสีห์" },
            { time: "12.00 - 13.00 น.", topic: "รับประทานอาหารกลางวัน", isBreak: true },
            { time: "13.00 - 15.30 น.", topic: "On-Line Workshop: เจาะลึกการใช้เครื่องมือและแบบฟอร์ม\nการประเมินผลลัพธ์การเรียนรู้ภาคปฏิบัติ", speaker: "ผศ.ดร.ผุสดี ชูชีพ\nอ.มลิจันทร์ เกียรติสังวร\nอ.ดร.อมรศรี ยอดคำ\nอ.ดร.สำเนา นิลบรรพ์\nอ.ทิพภา ปุณสีห์" },
            { time: "15.30 - 15.45 น.", topic: "รับประทานอาหารว่าง", isBreak: true },
            { time: "15.45 - 16.30 น.", topic: "On-Line Workshop: เจาะลึกการใช้เครื่องมือและแบบฟอร์ม\nการประเมินผลลัพธ์การเรียนรู้ภาคปฏิบัติ", speaker: "ผศ.ดร.ผุสดี ชูชีพ\nอ.มลิจันทร์ เกียรติสังวร\nอ.ดร.อมรศรี ยอดคำ\nอ.ดร.สำเนา นิลบรรพ์\nอ.ทิพภา ปุณสีห์" },
            { time: "16.30 - 17.00 น.", topic: "สรุปผลการเรียนรู้และประเมินความรู้หลังเข้าอบรม (Post-test)\nพิธีปิด มอบเกียรติบัตร และถ่ายภาพร่วมกัน", speaker: "ผศ.ดร.วนิดา ดุรงค์ฤทธิชัย" },
          ]}
        />
      </div>
    </div>
  );
}

function DaySchedule({ title, items }: { title: string, items: Array<{time: string, topic: string, speaker?: string, isBreak?: boolean}> }) {
  const renderTopic = (topic: string, isBreak?: boolean) => {
    if (isBreak) {
      return <div className="font-semibold text-black">{topic}</div>;
    }
    
    const lines = topic.split('\n');
    return (
      <div className="text-navy-900">
        {lines.map((line, i) => {
          const isNumbered = /^(\(ต่อ\)\s*)?\d+\.?\s/.test(line.trim());
          return (
            <div key={i} className={isNumbered ? "font-normal mt-1" : "font-semibold"}>
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="nav-gradient px-5 sm:px-6 py-4">
        <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((item, idx) => (
          <div key={idx} className={`p-4 sm:p-5 flex flex-col sm:flex-row gap-2 sm:gap-6 ${item.isBreak ? 'bg-slate-100' : 'bg-white'}`}>
            <div className={`sm:w-1/4 shrink-0 font-medium flex items-start text-sm sm:text-base ${item.isBreak ? 'text-black' : 'text-slate-600'}`}>
              <Clock className={`w-4 h-4 mr-2 mt-0.5 sm:mt-1 ${item.isBreak ? 'text-slate-500' : 'text-navy-700'}`} />
              {item.time}
            </div>
            <div className="sm:w-3/4">
              <div className="text-sm sm:text-base">
                {renderTopic(item.topic, item.isBreak)}
              </div>
              {item.speaker && (
                <div className="text-xs sm:text-sm text-pink-600 font-medium whitespace-pre-line flex items-start mt-2 sm:mt-3 border-l-2 border-pink-200 pl-3 py-2 bg-slate-50 rounded-r-md">
                  {item.speaker}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
