const questions = [
    // Level 1 - Easy
    {
        question: "O que significa a sigla 'Phishing'?",
        answers: [
            "Um tipo de pescaria virtual",
            "Uma técnica de engenharia social para roubar dados",
            "Um software antivírus",
            "Um componente de hardware"
        ],
        correct: 1,
        level: 1
    },
    {
        question: "Qual é a melhor prática para criar uma senha forte?",
        answers: [
            "Usar sua data de nascimento",
            "Usar '123456'",
            "Usar uma combinação de letras, números e símbolos",
            "Usar o nome do seu animal de estimação"
        ],
        correct: 2,
        level: 1
    },
    {
        question: "O que é um Firewall?",
        answers: [
            "Uma parede à prova de fogo",
            "Um sistema de segurança que monitora o tráfego de rede",
            "Um vírus de computador",
            "Um programa para editar fotos"
        ],
        correct: 1,
        level: 1
    },
    {
        question: "O que significa a sigla VPN?",
        answers: [
            "Very Personal Network",
            "Virtual Private Network",
            "Virus Protection Network",
            "Visual Processing Node"
        ],
        correct: 1,
        level: 1
    },
    {
        question: "Qual destes NÃO é um tipo de malware?",
        answers: [
            "Trojan",
            "Ransomware",
            "Spyware",
            "Hardware"
        ],
        correct: 3,
        level: 1
    },

    // Level 2 - Medium
    {
        question: "O que é 'Ransomware'?",
        answers: [
            "Um software que sequestra dados e pede resgate",
            "Um software de backup",
            "Um tipo de memória RAM",
            "Um cabo de rede"
        ],
        correct: 0,
        level: 2
    },
    {
        question: "O que é autenticação de dois fatores (2FA)?",
        answers: [
            "Ter duas senhas iguais",
            "Usar dois computadores",
            "Uma camada extra de segurança além da senha",
            "Fazer login duas vezes"
        ],
        correct: 2,
        level: 2
    },
    {
        question: "O que é um ataque DDoS?",
        answers: [
            "Download Direto de Sistema",
            "Negação de Serviço Distribuída",
            "Detecção de Dados Seguros",
            "Domínio de Servidor Dedicado"
        ],
        correct: 1,
        level: 2
    },
    {
        question: "O que é criptografia?",
        answers: [
            "A arte de escrever códigos secretos",
            "Uma moeda digital",
            "Um tipo de gráfico",
            "Um erro de sistema"
        ],
        correct: 0,
        level: 2
    },
    {
        question: "Qual porta é padrão para o protocolo HTTPS?",
        answers: [
            "80",
            "21",
            "443",
            "22"
        ],
        correct: 2,
        level: 2
    },

    // Level 3 - Hard
    {
        question: "O que é 'Zero Day Exploit'?",
        answers: [
            "Um ataque que ocorre à meia-noite",
            "Uma vulnerabilidade explorada antes de ser corrigida",
            "Um dia sem ataques cibernéticos",
            "Um software gratuito por um dia"
        ],
        correct: 1,
        level: 3
    },
    {
        question: "O que é SQL Injection?",
        answers: [
            "Uma vacina para computadores",
            "Inserção de código malicioso em consultas de banco de dados",
            "Uma técnica de limpeza de hardware",
            "Um tipo de conexão de internet"
        ],
        correct: 1,
        level: 3
    },
    {
        question: "O que é Engenharia Social em segurança?",
        answers: [
            "Construir redes sociais seguras",
            "Manipulação psicológica para obter informações confidenciais",
            "Programação em grupo",
            "Manutenção de servidores"
        ],
        correct: 1,
        level: 3
    },
    {
        question: "Qual é a função do protocolo SSL/TLS?",
        answers: [
            "Acelerar a internet",
            "Proteger a comunicação entre cliente e servidor",
            "Criar sites bonitos",
            "Gerenciar emails"
        ],
        correct: 1,
        level: 3
    },
    {
        question: "O que é um 'Honeypot'?",
        answers: [
            "Um pote de mel virtual",
            "Um sistema isca para atrair e monitorar atacantes",
            "Um software de culinária",
            "Um tipo de senha doce"
        ],
        correct: 1,
        level: 3
    },

    // Level 4 - Expert
    {
        question: "O que é XSS (Cross-Site Scripting)?",
        answers: [
            "Um estilo de folha de cascata",
            "Injeção de scripts maliciosos em sites confiáveis",
            "Um protocolo de transferência de arquivos",
            "Um sistema de arquivos cruzados"
        ],
        correct: 1,
        level: 4
    },
    {
        question: "O que é um ataque 'Man-in-the-Middle'?",
        answers: [
            "Um ataque ao servidor central",
            "Interceptação de comunicação entre duas partes",
            "Um homem no meio da sala de servidores",
            "Um ataque físico ao data center"
        ],
        correct: 1,
        level: 4
    },
    {
        question: "Qual o princípio da segurança que garante que a informação não foi alterada?",
        answers: [
            "Confidencialidade",
            "Disponibilidade",
            "Integridade",
            "Autenticidade"
        ],
        correct: 2,
        level: 4
    },
    {
        question: "O que é 'Pentest'?",
        answers: [
            "Teste de canetas digitais",
            "Teste de penetração para avaliar a segurança",
            "Teste de desempenho de processador",
            "Teste de velocidade de internet"
        ],
        correct: 1,
        level: 4
    },
    {
        question: "O que significa a sigla SIEM?",
        answers: [
            "Security Information and Event Management",
            "System Internet Electronic Mail",
            "Secure Internet External Monitor",
            "Simple Internal Error Message"
        ],
        correct: 0,
        level: 4
    }
];
