// ================================================
// نظام فرز طوارئ الأسنان - الكود الكامل
// ================================================

// بيانات الأسئلة الكاملة
const triageData = {
“version”: “2.0.0”,
“lastUpdated”: “2024-12-10”,
“language”: “ar”,
“description”: “نظام فرز طوارئ الأسنان - التدفق الكامل”,

“personalInformation”: {
“section”: “المعلومات الشخصية”,
“fields”: [
{
“id”: “national_id”,
“fieldName”: “رقم الهوية”,
“type”: “text”,
“required”: true,
“validation”: “^[0-9]{10}$”,
“placeholder”: “أدخل رقم الهوية (10 أرقام)”
},
{
“id”: “full_name”,
“fieldName”: “الاسم الثلاثي”,
“type”: “text”,
“required”: true,
“placeholder”: “الاسم الأول الأب العائلة”
},
{
“id”: “age”,
“fieldName”: “العمر”,
“type”: “number”,
“required”: true,
“min”: 1,
“max”: 120
},
{
“id”: “mobile”,
“fieldName”: “رقم الجوال”,
“type”: “tel”,
“required”: true,
“validation”: “^(05)[0-9]{8}$”,
“placeholder”: “05XXXXXXXX”
},
{
“id”: “gender”,
“fieldName”: “الجنس”,
“type”: “radio”,
“required”: true,
“options”: [
{ “value”: “male”, “label”: “ذكر” },
{ “value”: “female”, “label”: “أنثى” }
]
}
]
},

“questions”: [
{
“id”: “q1_critical_symptoms”,
“order”: 1,
“section”: “السؤال الأول: الأعراض الخطيرة”,
“question”: “هل تعاني من أياً من هذه الأعراض الآن؟”,
“type”: “single-choice”,
“required”: true,
“critical”: true,
“options”: [
{
“id”: “q1_opt1”,
“text”: “صعوبة شديدة ومفاجئة في التنفس والبلع”,
“value”: “breathing_difficulty”,
“priority”: “immediate”,
“alert”: true,
“alertMessage”: “⚠️ تحذير طارئ: يجب التوجه فوراً لطوارئ المستشفى العام.”,
“endFlow”: true
},
{
“id”: “q1_opt2”,
“text”: “نزيف لا يتوقف أو لا يمكن السيطرة عليه بالضغط لمدة 10 دقائق”,
“value”: “uncontrolled_bleeding”,
“priority”: “immediate”,
“alert”: true,
“alertMessage”: “⚠️ تحذير طارئ: يجب التوجه فوراً لطوارئ المستشفى العام.”,
“endFlow”: true
},
{
“id”: “q1_opt3”,
“text”: “تورم كبير ينتشر بسرعة إلى الرقبة أو أسفل العين، أو تورم أسفل اللسان يعيق الكلام/البلع”,
“value”: “severe_spreading_swelling”,
“priority”: “immediate”,
“alert”: true,
“alertMessage”: “⚠️ تحذير طارئ: يجب التوجه فوراً لطوارئ المستشفى العام.”,
“endFlow”: true
},
{
“id”: “q1_opt4”,
“text”: “لا، أخرى”,
“value”: “none”,
“priority”: “continue”,
“nextQuestion”: “q2_main_problem”
}
]
},

```
{
  "id": "q2_main_problem",
  "order": 2,
  "section": "السؤال الثاني: المشكلة الرئيسية",
  "question": "ما هي المشكلة الرئيسية التي تعاني منها؟",
  "type": "single-choice",
  "required": true,
  "options": [
    {
      "id": "q2_opt1",
      "text": "ألم شديد",
      "value": "severe_pain",
      "route": "path_a_pain"
    },
    {
      "id": "q2_opt2",
      "text": "تورم / خراج",
      "value": "swelling_abscess",
      "route": "path_b_swelling"
    },
    {
      "id": "q2_opt3",
      "text": "كسر بالأسنان",
      "value": "broken_tooth",
      "route": "path_c_fracture"
    },
    {
      "id": "q2_opt4",
      "text": "سقوط حشوة أو تركيبة",
      "value": "lost_filling",
      "route": "path_d_filling"
    },
    {
      "id": "q2_opt5",
      "text": "أخرى",
      "value": "other",
      "route": "path_e_other",
      "requiresInput": true
    }
  ]
}
```

],

“routes”: {
“path_a_pain”: {
“name”: “المسار أ: ألم شديد”,
“questions”: [
{
“id”: “pa_q1”,
“order”: 1,
“question”: “هل يمكنك تحديد مكان الألم بوضوح؟”,
“type”: “single-choice”,
“required”: true,
“options”: [
{ “id”: “pa_q1_opt1”, “text”: “نعم، سن محدد”, “value”: “specific_tooth” },
{ “id”: “pa_q1_opt2”, “text”: “لا، ألم عام في الفك أو الوجه”, “value”: “general_jaw_pain” },
{ “id”: “pa_q1_opt3”, “text”: “ألم ينتشر من سن إلى الرأس/الأذن”, “value”: “radiating_pain” }
]
},
{
“id”: “pa_q2”,
“order”: 2,
“question”: “مدى شدة الألم؟”,
“type”: “single-choice”,
“required”: true,
“options”: [
{ “id”: “pa_q2_opt1”, “text”: “خفيف”, “value”: “mild”, “score”: 3 },
{ “id”: “pa_q2_opt2”, “text”: “متوسط”, “value”: “moderate”, “score”: 6 },
{ “id”: “pa_q2_opt3”, “text”: “شديد”, “value”: “severe”, “score”: 9 }
]
},
{
“id”: “pa_q3”,
“order”: 3,
“question”: “هل الألم الذي تشعر به بسبب المحفزات (مثل الماء البارد، القهوة الساخنة، أو الهواء) يزول بسرعة، أم يستمر لفترة طويلة؟”,
“type”: “single-choice”,
“required”: true,
“options”: [
{ “id”: “pa_q3_opt1”, “text”: “يزول الألم فوراً أو بعد ثوانٍ قليلة”, “value”: “immediate_relief”, “score”: 3 },
{ “id”: “pa_q3_opt2”, “text”: “يستمر الألم طويلاً (أكثر من دقيقة)”, “value”: “prolonged_pain”, “score”: 7 },
{ “id”: “pa_q3_opt3”, “text”: “الألم مستمر في جميع الأوقات”, “value”: “constant_pain”, “score”: 10 }
]
},
{
“id”: “pa_q4”,
“order”: 4,
“question”: “هل الألم يوقظك من النوم؟”,
“type”: “single-choice”,
“required”: true,
“options”: [
{ “id”: “pa_q4_opt1”, “text”: “نعم”, “value”: “yes”, “score”: 8 },
{ “id”: “pa_q4_opt2”, “text”: “لا”, “value”: “no”, “score”: 0 }
]
}
],
“nextSection”: “health_conditions”
},

```
"path_b_swelling": {
  "name": "المسار ب: تورم / خراج",
  "questions": [
    {
      "id": "pb_q1",
      "order": 1,
      "question": "هل لديك ارتفاع في درجة الحرارة (حمى)؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pb_q1_opt1", "text": "نعم", "value": "yes", "critical": true, "score": 10 },
        { "id": "pb_q1_opt2", "text": "لا", "value": "no", "score": 0 }
      ]
    },
    {
      "id": "pb_q2",
      "order": 2,
      "question": "هل التورم يؤثر على فتح فمك أو البلع؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pb_q2_opt1", "text": "نعم", "value": "yes", "critical": true, "score": 9 },
        { "id": "pb_q2_opt2", "text": "لا", "value": "no", "score": 0 }
      ]
    },
    {
      "id": "pb_q3",
      "order": 3,
      "question": "هل التورم يقع داخل الفم (بالقرب من اللثة أو الأسنان) أم على جلد الوجه أو الرقبة؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pb_q3_opt1", "text": "داخل الفم فقط", "value": "intraoral", "score": 5 },
        { "id": "pb_q3_opt2", "text": "خارج الفم (على الوجه أو الرقبة)", "value": "extraoral", "critical": true, "score": 10 }
      ]
    },
    {
      "id": "pb_q4",
      "order": 4,
      "question": "هل الانتفاخ طري ويمكن الضغط عليه (كأنه يحوي سائلاً) أم صلب؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pb_q4_opt1", "text": "طري", "value": "soft", "score": 6 },
        { "id": "pb_q4_opt2", "text": "صلب", "value": "hard", "score": 8 }
      ]
    }
  ],
  "nextSection": "health_conditions"
},

"path_c_fracture": {
  "name": "المسار ج: كسر بالأسنان",
  "questions": [
    {
      "id": "pc_q1",
      "order": 1,
      "question": "هل تشاهد بقعة حمراء أو دموية صغيرة في الكسر؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pc_q1_opt1", "text": "نعم", "value": "yes", "score": 8, "continueToHealthConditions": true },
        { "id": "pc_q1_opt2", "text": "لا", "value": "no", "score": 0 }
      ]
    },
    {
      "id": "pc_q2",
      "order": 2,
      "question": "هل الكسر يسبب حساسية فورية ومؤلمة جداً عند تعرضه للهواء أو الماء؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pc_q2_opt1", "text": "نعم", "value": "yes", "score": 7, "continueToHealthConditions": true },
        { "id": "pc_q2_opt2", "text": "لا", "value": "no", "score": 0 }
      ]
    },
    {
      "id": "pc_q3",
      "order": 3,
      "question": "هل الكسر مصحوب بألم مستمر شديد (حتى بدون لمس)؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pc_q3_opt1", "text": "نعم", "value": "yes", "score": 9, "continueToHealthConditions": true },
        { "id": "pc_q3_opt2", "text": "لا", "value": "no", "score": 0 }
      ]
    }
  ],
  "nextSection": "health_conditions"
},

"path_d_filling": {
  "name": "المسار د: سقوط حشوة أو تركيبة",
  "questions": [
    {
      "id": "pd_q1",
      "order": 1,
      "question": "ما الذي سقط تحديداً؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pd_q1_opt1", "text": "حشوة بسيطة", "value": "simple_filling", "score": 3 },
        { "id": "pd_q1_opt2", "text": "تاج (غطاء) سن", "value": "crown", "score": 5 },
        { "id": "pd_q1_opt3", "text": "جسر أو تركيبة طويلة", "value": "bridge", "score": 6 }
      ]
    },
    {
      "id": "pd_q2",
      "order": 2,
      "question": "هل هذا مصحوب بألم أو بدون ألم؟",
      "type": "single-choice",
      "required": true,
      "options": [
        { "id": "pd_q2_opt1", "text": "مع ألم", "value": "with_pain", "redirectTo": "path_a_pain" },
        { "id": "pd_q2_opt2", "text": "بدون ألم", "value": "no_pain", "endFlow": true, "message": "سيتم مراجعة حالتك والرد عليك بأسرع وقت." }
      ]
    }
  ]
},

"path_e_other": {
  "name": "المسار هـ: أخرى",
  "nextSection": "health_conditions"
}
```

},

“healthConditions”: {
“section”: “أسئلة الحالات الصحية الإضافية”,
“id”: “health_conditions”,
“question”: “هل لديك أي من هذه الحالات التالية؟”,
“note”: “يمكن اختيار أكثر من خيار”,
“type”: “multiple-choice”,
“required”: true,
“options”: [
{
“id”: “hc_opt1”,
“text”: “حساسية من دواء أو مضاد”,
“value”: “drug_allergy”,
“critical”: true,
“requiresInput”: true,
“inputLabel”: “حدد الدواء ونوع الحساسية:”,
“inputPlaceholder”: “مثال: حساسية من البنسلين - طفح جلدي”
},
{
“id”: “hc_opt2”,
“text”: “مشاكل صحية مزمنة”,
“value”: “chronic_conditions”,
“critical”: true,
“requiresInput”: true,
“inputLabel”: “حدد نوع المشكلة (مثل السكري، الضغط، القلب):”,
“inputPlaceholder”: “اكتب المشاكل الصحية المزمنة”
},
{
“id”: “hc_opt3”,
“text”: “أتناول أدوية مسيلة للدم”,
“value”: “blood_thinners”,
“critical”: true,
“score”: 8
},
{
“id”: “hc_opt4”,
“text”: “حامل”,
“value”: “pregnant”,
“critical”: true,
“conditional”: { “field”: “gender”, “value”: “female” },
“score”: 7
},
{
“id”: “hc_opt5”,
“text”: “لا يوجد”,
“value”: “none”,
“score”: 0,
“exclusive”: true
}
]
},

“triageLevels”: {
“immediate”: {
“level”: 1,
“name”: “طارئة جداً”,
“color”: “#DC2626”,
“action”: “التوجه فوراً لطوارئ المستشفى العام”
},
“urgent”: {
“level”: 2,
“name”: “عاجل”,
“color”: “#F97316”,
“maxWaitTime”: “30-60 دقيقة”
},
“semi_urgent”: {
“level”: 3,
“name”: “شبه عاجل”,
“color”: “#FBBF24”,
“maxWaitTime”: “2-4 ساعات”
},
“standard”: {
“level”: 4,
“name”: “قياسي”,
“color”: “#10B981”,
“maxWaitTime”: “خلال نفس اليوم”
}
}
};

// ================================================
// المتغيرات العامة
// ================================================
let currentStep = ‘personal_info’;
let currentRoute = null;
let currentQuestionIndex = 0;
let patientData = {
personalInfo: {},
answers: {},
score: 0,
triageLevel: null
};

// ================================================
// دوال التحكم في الواجهة
// ================================================

// عرض المعلومات الشخصية
function renderPersonalInfo() {
const container = document.getElementById(‘questions-container’);
if (!container) return;

let html = `<div class="personal-info-section"> <h2>المعلومات الشخصية</h2> <form id="personal-info-form">`;

triageData.personalInformation.fields.forEach(field => {
html += `<div class="form-group">`;
html += `<label for="${field.id}">${field.fieldName} ${field.required ? '<span class="required">*</span>' : ''}</label>`;

```
if (field.type === 'radio') {
  field.options.forEach(option => {
    html += `
      <label class="radio-label">
        <input type="radio" name="${field.id}" value="${option.value}" required>
        ${option.label}
      </label>
    `;
  });
} else {
  html += `
    <input 
      type="${field.type}" 
      id="${field.id}" 
      name="${field.id}"
      placeholder="${field.placeholder || ''}"
      ${field.required ? 'required' : ''}
      ${field.min ? `min="${field.min}"` : ''}
      ${field.max ? `max="${field.max}"` : ''}
    >
  `;
}
html += `</div>`;
```

});

html += `<button type="submit" class="btn btn-primary">التالي</button> </form> </div>`;

container.innerHTML = html;

// معالجة إرسال النموذج
document.getElementById(‘personal-info-form’).addEventListener(‘submit’, handlePersonalInfoSubmit);
}

// معالجة إرسال المعلومات الشخصية
function handlePersonalInfoSubmit(e) {
e.preventDefault();

const formData = new FormData(e.target);
triageData.personalInformation.fields.forEach(field => {
patientData.personalInfo[field.id] = formData.get(field.id);
});

// التحقق من صحة البيانات
if (!validatePersonalInfo()) return;

currentStep = ‘questions’;
renderQuestion(‘q1_critical_symptoms’);
}

// التحقق من صحة المعلومات الشخصية
function validatePersonalInfo() {
const nationalId = patientData.personalInfo.national_id;
const mobile = patientData.personalInfo.mobile;

if (!/^[0-9]{10}$/.test(nationalId)) {
alert(‘رقم الهوية يجب أن يكون 10 أرقام’);
return false;
}

if (!/^(05)[0-9]{8}$/.test(mobile)) {
alert(‘رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام’);
return false;
}

return true;
}

// عرض سؤال
function renderQuestion(questionId) {
const container = document.getElementById(‘questions-container’);
if (!container) return;

let question;

// البحث عن السؤال في الأسئلة الرئيسية
question = triageData.questions.find(q => q.id === questionId);

// إذا لم يُعثر عليه، ابحث في المسارات
if (!question && currentRoute) {
const route = triageData.routes[currentRoute];
question = route.questions[currentQuestionIndex];
}

if (!question) return;

let html = `
<div class="question-container">
<div class="progress-bar">
<div class="progress" style="width: ${calculateProgress()}%"></div>
</div>

```
  <h3>${question.question}</h3>
  
  <form id="question-form">
```

`;

// إذا كان السؤال يحتاج input نصي (مثل “أخرى”)
if (question.options && question.options.some(opt => opt.requiresInput)) {
question.options.forEach(option => {
html += `<div class="option"> <label> <input type="radio" name="answer" value="${option.value}" data-option-id="${option.id}"> ${option.text} </label>`;

```
  if (option.requiresInput) {
    html += `
      <div id="input-${option.id}" class="conditional-input" style="display: none;">
        <textarea 
          name="other_description" 
          placeholder="اكتب وصف المشكلة هنا..."
          maxlength="500"
        ></textarea>
      </div>
    `;
  }
  
  html += `</div>`;
});
```

} else {
// أسئلة عادية
question.options.forEach(option => {
html += `<div class="option"> <label> <input type="radio" name="answer" value="${option.value}" data-option-id="${option.id}"> ${option.text} </label> </div>`;
});
}

html += `<button type="submit" class="btn btn-primary">التالي</button> </form> </div>`;

container.innerHTML = html;

// إضافة مستمع للخيارات التي تحتاج input
document.querySelectorAll(‘input[name=“answer”]’).forEach(radio => {
radio.addEventListener(‘change’, handleRadioChange);
});

document.getElementById(‘question-form’).addEventListener(‘submit’, (e) => handleQuestionSubmit(e, question));
}

// معالجة تغيير الاختيار
function handleRadioChange(e) {
// إخفاء جميع الحقول الشرطية
document.querySelectorAll(’.conditional-input’).forEach(input => {
input.style.display = ‘none’;
});

// إظهار الحقل المرتبط بالخيار المحدد
const optionId = e.target.dataset.optionId;
const conditionalInput = document.getElementById(`input-${optionId}`);
if (conditionalInput) {
conditionalInput.style.display = ‘block’;
}
}

// معالجة إرسال السؤال
function handleQuestionSubmit(e, question) {
e.preventDefault();

const formData = new FormData(e.target);
const selectedValue = formData.get(‘answer’);
const selectedOption = question.options.find(opt => opt.value === selectedValue);

if (!selectedOption) return;

// حفظ الإجابة
patientData.answers[question.id] = {
value: selectedValue,
score: selectedOption.score || 0
};

// إذا كان هناك وصف إضافي
if (formData.get(‘other_description’)) {
patientData.answers[question.id].description = formData.get(‘other_description’);
}

// إضافة النقاط
if (selectedOption.score) {
patientData.score += selectedOption.score;
}

// التحقق من الحالات الطارئة
if (selectedOption.alert) {
showEmergencyAlert(selectedOption.alertMessage);
return;
}

// التحقق من إنهاء التدفق
if (selectedOption.endFlow) {
if (selectedOption.message) {
showMessage(selectedOption.message);
} else {
showResults();
}
return;
}

// تحديد الخطوة التالية
if (selectedOption.route) {
currentRoute = selectedOption.route;
currentQuestionIndex = 0;
renderRouteQuestion();
} else if (selectedOption.redirectTo) {
currentRoute = selectedOption.redirectTo;
currentQuestionIndex = 0;
renderRouteQuestion();
} else if (selectedOption.nextQuestion) {
renderQuestion(selectedOption.nextQuestion);
} else {
// الانتقال للسؤال التالي في نفس المسار
currentQuestionIndex++;
renderRouteQuestion();
}
}

// عرض أسئلة المسار
function renderRouteQuestion() {
const route = triageData.routes[currentRoute];

if (!route) {
renderHealthConditions();
return;
}

if (currentQuestionIndex < route.questions.length) {
const question = route.questions[currentQuestionIndex];
renderQuestion(question.id);
} else {
// انتهت أسئلة المسار، انتقل للحالات الصحية
if (route.nextSection === ‘health_conditions’) {
renderHealthConditions();
}
}
}

// عرض أسئلة الحالات الصحية
function renderHealthConditions() {
const container = document.getElementById(‘questions-container’);
if (!container) return;

const hc = triageData.healthConditions;
const gender = patientData.personalInfo.gender;

let html = `
<div class="health-conditions-section">
<h3>${hc.question}</h3>
<p class="note">${hc.note}</p>

```
  <form id="health-conditions-form">
```

`;

hc.options.forEach(option => {
// تحقق من الشرط الخاص بالجنس
if (option.conditional && option.conditional.value !== gender) {
return; // تخطي هذا الخيار
}

```
html += `
  <div class="option">
    <label>
      <input 
        type="checkbox" 
        name="health_condition" 
        value="${option.value}"
        data-option-id="${option.id}"
        ${option.exclusive ? 'data-exclusive="true"' : ''}
      >
      ${option.text}
    </label>
`;

if (option.requiresInput) {
  html += `
    <div id="input-${option.id}" class="conditional-input" style="display: none;">
      <label>${option.inputLabel}</label>
      <textarea 
        name="detail_${option.value}" 
        placeholder="${option.inputPlaceholder}"
        maxlength="200"
      ></textarea>
    </div>
  `;
}

html += `</div>`;
```

});

html += `<button type="submit" class="btn btn-primary">إنهاء</button> </form> </div>`;

container.innerHTML = html;

// إضافة مستمعات للـ checkboxes
document.querySelectorAll(‘input[name=“health_condition”]’).forEach(checkbox => {
checkbox.addEventListener(‘change’, handleHealthConditionChange);
});

document.getElementById(‘health-conditions-form’).addEventListener(‘submit’, handleHealthConditionsSubmit);
}

// معالجة تغيير الحالات الصحية
function handleHealthConditionChange(e) {
const checkbox = e.target;

// إذا كان الخيار حصري (مثل “لا يوجد”)
if (checkbox.dataset.exclusive && checkbox.checked) {
document.querySelectorAll(‘input[name=“health_condition”]’).forEach(cb => {
if (cb !== checkbox) {
cb.checked = false;
const inputDiv = document.getElementById(`input-${cb.dataset.optionId}`);
if (inputDiv) inputDiv.style.display = ‘none’;
}
});
} else if (checkbox.checked) {
// إلغاء تحديد الخيار الحصري
document.querySelectorAll(‘input[data-exclusive=“true”]’).forEach(cb => {
cb.checked = false;
});
}

// إظهار/إخفاء حقل الإدخال
const optionId = checkbox.dataset.optionId;
const inputDiv = document.getElementById(`input-${optionId}`);
if (inputDiv) {
inputDiv.style.display = checkbox.checked ? ‘block’ : ‘none’;
}
}

// معالجة إرسال الحالات الصحية
function handleHealthConditionsSubmit(e) {
e.preventDefault();

const formData = new FormData(e.target);
const selectedConditions = formData.getAll(‘health_condition’);

patientData.answers.health_conditions = [];

selectedConditions.forEach(condition => {
const conditionData = { value: condition };

```
// إضافة التفاصيل إذا وجدت
const detail = formData.get(`detail_${condition}`);
if (detail) {
  conditionData.detail = detail;
}

// إضافة النقاط
const option = triageData.healthConditions.options.find(opt => opt.value === condition);
if (option && option.score) {
  patientData.score += option.score;
  conditionData.score = option.score;
}

patientData.answers.health_conditions.push(conditionData);
```

});

// عرض النتائج
showResults();
}

// حساب نسبة التقدم
function calculateProgress() {
// حساب بسيط للتقدم
const totalSteps = 15; // تقريبي
const currentStepNumber = Object.keys(patientData.answers).length;
return Math.min((currentStepNumber / totalSteps) * 100, 100);
}

// عرض تنبيه طارئ
function showEmergencyAlert(message) {
const container = document.getElementById(‘questions-container’);

container.innerHTML = `<div class="emergency-alert"> <div class="alert-icon">⚠️</div> <h2>تحذير طارئ</h2> <p>${message}</p> <button onclick="location.reload()" class="btn btn-danger">فهمت</button> </div>`;
}

// عرض رسالة
function showMessage(message) {
const container = document.getElementById(‘questions-container’);

container.innerHTML = `<div class="message-box"> <div class="message-icon">ℹ️</div> <p>${message}</p> <button onclick="location.reload()" class="btn btn-primary">العودة للبداية</button> </div>`;
}

// تحديد مستوى الفرز بناءً على النقاط
function determineTriageLevel(score) {
if (score >= 50) return ‘immediate’;
if (score >= 35) return ‘urgent’;
if (score >= 20) return ‘semi_urgent’;
if (score >= 10) return ‘standard’;
return ‘standard’;
}

// عرض النتائج
function showResults() {
const triageLevel = determineTriageLevel(patientData.score);
patientData.triageLevel = triageLevel;

const levelData = triageData.triageLevels[triageLevel];
const container = document.getElementById(‘questions-container’);

container.innerHTML = `
<div class="results-section">
<h2>نتيجة الفرز</h2>

```
  <div class="triage-result" style="border-color: ${levelData.color};">
    <div class="triage-badge" style="background-color: ${levelData.color};">
      ${levelData.name}
    </div>
    
    <div class="result-details">
      <p><strong>مستوى الأولوية:</strong> ${levelData.level}</p>
      ${levelData.maxWaitTime ? `<p><strong>وقت الانتظار المتوقع:</strong> ${levelData.maxWaitTime}</p>` : ''}
      ${levelData.action ? `<p><strong>الإجراء المطلوب:</strong> ${levelData.action}</p>` : ''}
    </div>
  </div>

  <div class="patient-summary">
    <h3>ملخص الحالة</h3>
    <div class="summary-item">
      <strong>الاسم:</strong> ${patientData.personalInfo.full_name}
    </div>
    <div class="summary-item">
      <strong>رقم الجوال:</strong> ${patientData.personalInfo.mobile}
    </div>
    <div class="summary-item">
      <strong>العمر:</strong> ${patientData.personalInfo.age} سنة
    </div>
  </div>

  <div class="action-buttons">
    <button onclick="printResults()" class="btn btn-secondary">طباعة النتيجة</button>
    <button onclick="saveResults()" class="btn btn-primary">حفظ وإرسال</button>
    <button onclick="location.reload()" class="btn btn-outline">حالة جديدة</button>
  </div>
</div>
```

`;

// حفظ البيانات في localStorage للطبيب
saveToLocalStorage();
}

// حفظ البيانات
function saveToLocalStorage() {
const existingData = JSON.parse(localStorage.getItem(‘triagePatients’) || ‘[]’);

patientData.timestamp = new Date().toISOString();
patientData.id = ‘P’ + Date.now();

existingData.push(patientData);
localStorage.setItem(‘triagePatients’, JSON.stringify(existingData));
}

// طباعة النتائج
function printResults() {
window.print();
}

// حفظ وإرسال النتائج
function saveResults() {
alert(‘تم حفظ بياناتك بنجاح. سيتم التواصل معك قريباً.’);
// هنا يمكن إضافة كود لإرسال البيانات للسيرفر
}

// ================================================
// تهيئة التطبيق
// ================================================
document.addEventListener(‘DOMContentLoaded’, function() {
console.log(‘تم تحميل نظام فرز طوارئ الأسنان’);

// بدء التطبيق بعرض المعلومات الشخصية
renderPersonalInfo();
});

// ================================================
// دوال إضافية للطبيب (doctor_login.html)
// ================================================

// عرض قائمة المرضى (للطبيب)
function loadPatientsForDoctor() {
const patients = JSON.parse(localStorage.getItem(‘triagePatients’) || ‘[]’);
const container = document.getElementById(‘patients-list’);

if (!container) return;

if (patients.length === 0) {
container.innerHTML = ‘<p>لا توجد حالات حالياً</p>’;
return;
}

// ترتيب المرضى حسب الأولوية
patients.sort((a, b) => {
const levelOrder = { immediate: 1, urgent: 2, semi_urgent: 3, standard: 4 };
return levelOrder[a.triageLevel] - levelOrder[b.triageLevel];
});

let html = ‘<div class="patients-table">’;

patients.forEach(patient => {
const levelData = triageData.triageLevels[patient.triageLevel];

```
html += `
  <div class="patient-card" style="border-left: 4px solid ${levelData.color};">
    <div class="patient-header">
      <h4>${patient.personalInfo.full_name}</h4>
      <span class="badge" style="background: ${levelData.color};">${levelData.name}</span>
    </div>
    <div class="patient-info">
      <p><strong>الجوال:</strong> ${patient.personalInfo.mobile}</p>
      <p><strong>العمر:</strong> ${patient.personalInfo.age}</p>
      <p><strong>الوقت:</strong> ${new Date(patient.timestamp).toLocaleString('ar-SA')}</p>
      <p><strong>النقاط:</strong> ${patient.score}</p>
    </div>
    <button onclick="viewPatientDetails('${patient.id}')" class="btn btn-sm">عرض التفاصيل</button>
  </div>
`;
```

});

html += ‘</div>’;
container.innerHTML = html;
}

// عرض تفاصيل المريض
function viewPatientDetails(patientId) {
const patients = JSON.parse(localStorage.getItem(‘triagePatients’) || ‘[]’);
const patient = patients.find(p => p.id === patientId);

if (!patient) return;

// يمكن عرض تفاصيل كاملة في modal أو صفحة منفصلة
alert(`تفاصيل المريض: ${patient.personalInfo.full_name}\nالحالة: ${triageData.triageLevels[patient.triageLevel].name}`);
}

// تصدير البيانات إلى Excel (اختياري)
function exportToExcel() {
const patients = JSON.parse(localStorage.getItem(‘triagePatients’) || ‘[]’);

if (patients.length === 0) {
alert(‘لا توجد بيانات للتصدير’);
return;
}

// هنا يمكن استخدام مكتبة مثل SheetJS لتصدير البيانات
console.log(‘تصدير البيانات:’, patients);
alert(‘جاري تصدير البيانات…’);
}
