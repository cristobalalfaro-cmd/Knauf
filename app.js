// Demo de datos estáticos.
// En un proyecto real, estos datos podrían venir desde una API o base de datos.
const processes = [
  {
    id: 1,
    name: "Calcinación de yeso",
    area: "Producción",
    documents: [
      {
        id: "C-01",
        name: "Procedimiento estándar de calcinación",
        type: "Procedimiento",
        description:
          "Descripción paso a paso del proceso de calcinación de yeso, parámetros de operación, controles y roles involucrados."
      },
      {
        id: "C-02",
        name: "Matriz de riesgos y controles - Calcinación",
        type: "Matriz de riesgos",
        description:
          "Identificación de riesgos críticos, controles operativos, medidas de mitigación y responsables."
      }
    ]
  },
  {
    id: 2,
    name: "Mezclado y conformado de placas",
    area: "Producción",
    documents: [
      {
        id: "M-01",
        name: "Instrucción de trabajo de línea de mezclado",
        type: "Instrucción de trabajo",
        description:
          "Secuencia de operación de la línea de mezclado, dosificación, equipos críticos y parámetros de calidad."
      },
      {
        id: "M-02",
        name: "Checklist de inicio de turno",
        type: "Checklist",
        description:
          "Lista de verificación previa al inicio de turno para asegurar condiciones seguras y estándar de operación."
      }
    ]
  },
  {
    id: 3,
    name: "Despacho y almacenamiento",
    area: "Logística",
    documents: [
      {
        id: "D-01",
        name: "Procedimiento de carga de pallets",
        type: "Procedimiento",
        description:
          "Lineamientos para carga, sujeción, inspección visual y registro de pallets listos para despacho."
      },
      {
        id: "D-02",
        name: "Instructivo de verificación documental",
        type: "Instructivo",
        description:
          "Pasos para verificar órdenes, guías de despacho y documentos asociados al envío."
      }
    ]
  }
];

const processListEl = document.getElementById("processList");
const searchInputEl = document.getElementById("searchInput");

const modalEl = document.getElementById("docModal");
const modalTitleEl = document.getElementById("modalTitle");
const modalMetaEl = document.getElementById("modalMeta");
const modalBodyEl = document.getElementById("modalBody");
const modalCloseBtn = document.getElementById("modalCloseBtn");

function renderProcesses(filterText = "") {
  const search = filterText.trim().toLowerCase();
  processListEl.innerHTML = "";

  const filtered = processes.filter((p) => {
    if (!search) return true;
    const inProcess =
      p.name.toLowerCase().includes(search) ||
      p.area.toLowerCase().includes(search);
    const inDocs = p.documents.some(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.type.toLowerCase().includes(search)
    );
    return inProcess || inDocs;
  });

  if (filtered.length === 0) {
    processListEl.innerHTML =
      '<p class="empty-state">No se encontraron procesos para ese criterio de búsqueda.</p>';
    return;
  }

  filtered.forEach((process) => {
    const card = document.createElement("article");
    card.className = "process-card";

    const header = document.createElement("div");
    header.className = "process-header";

    const titleWrap = document.createElement("div");
    titleWrap.innerHTML = `
      <div class="process-title">${process.name}</div>
      <div class="process-meta">${process.area}</div>
    `;

    const countBadge = document.createElement("span");
    countBadge.className = "badge";
    countBadge.textContent = `${process.documents.length} doc.`;

    header.appendChild(titleWrap);
    header.appendChild(countBadge);

    const body = document.createElement("div");
    body.className = "process-body";

    const ul = document.createElement("ul");
    ul.className = "doc-list";

    process.documents.forEach((doc) => {
      const li = document.createElement("li");
      li.className = "doc-item";

      const info = document.createElement("div");
      info.className = "doc-info";
      info.innerHTML = `
        <span class="doc-name">${doc.name}</span>
        <span class="doc-type">${doc.type}</span>
      `;

      const btn = document.createElement("button");
      btn.className = "doc-open-btn";
      btn.textContent = "Ver";
      btn.addEventListener("click", () => openDocument(process, doc));

      li.appendChild(info);
      li.appendChild(btn);
      ul.appendChild(li);
    });

    body.appendChild(ul);
    card.appendChild(header);
    card.appendChild(body);
    processListEl.appendChild(card);
  });
}

function openDocument(process, doc) {
  modalTitleEl.textContent = doc.name;
  modalMetaEl.textContent = `${process.name} · ${doc.type}`;
  modalBodyEl.textContent = doc.description;
  modalEl.classList.add("show");
  modalEl.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalEl.classList.remove("show");
  modalEl.setAttribute("aria-hidden", "true");
}

modalCloseBtn.addEventListener("click", closeModal);
modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

searchInputEl.addEventListener("input", (e) => {
  renderProcesses(e.target.value);
});

// Inicializar
renderProcesses();
