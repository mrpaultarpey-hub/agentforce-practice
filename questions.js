// Question bank for the Salesforce Certified Agentforce Specialist exam (Spring '26 outline).
// Every question is original. Never use exam dumps.
//
// Each question:
//   id          unique id, never reused
//   section     one of the SECTIONS ids
//   objective   the exam objective it tests (from docs/exam-outline.md)
//   group       optional: questions on the same idea share a group so they don't come up back to back
//   stem        the question, or a list of alternative wordings
//   options     every option, with correct: true/false and why it is right or wrong.
//               There can be more wrong options than are shown. The app picks a random set.
//   show        optional: how many options to show (default 4, or right answers + 3 for "Choose N")
//   explanation shown after answering. Blank lines split paragraphs. `backticks` for code.
//   source      { title, url } the Salesforce page the answer is checked against

window.SECTIONS = [
  { id: 'agents', name: 'AI Agents', weight: 35 },
  { id: 'prompt', name: 'Prompt Engineering', weight: 20 },
  { id: 'data', name: 'Data 360 Fundamentals', weight: 20 },
  { id: 'testing', name: 'Testing, Deployment and Maintenance', weight: 10 },
  { id: 'governance', name: 'Governance and Observability', weight: 10 },
  { id: 'multi', name: 'Multi-Agent Orchestration', weight: 5 }
];

// Builds a source link to a Salesforce Help article from its id.
const help = (title, id) => ({ title: 'Salesforce Help: ' + title, url: 'https://help.salesforce.com/s/articleView?id=' + id + '.htm&type=5' });

const SRC = {
  agentScript: { title: 'Trailhead: Agent Script Basics', url: 'https://trailhead.salesforce.com/content/learn/modules/agent-script-basics/read-the-language-behind-the-canvas' },
  hybrid: { title: 'Salesforce Architects: Hybrid Reasoning with Agentforce Builder and Agent Script', url: 'https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script' },
  trust: { title: 'Agentforce Developer Guide: Trust Layer', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html' },
  testing: { title: 'Trailhead: Agentforce Agent Testing', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-agent-testing/set-up-testing-criteria' },
  deploy: { title: 'Trailhead: Deploy an AI Agent with Agentforce', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/deploy-an-ai-agent-with-agentforce' },
  dataLibrary: { title: 'Trailhead: Agentforce Data Library Basics', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/upgrade-ai-with-real-world-data' },
  retriever: { title: 'Salesforce Developers: Create a Search Index and Retriever', url: 'https://developer.salesforce.com/docs/ai/ground-agentforce-on-website/guide/aes-create-search-index-and-retriever.html' },
  commandCenter: { title: 'Salesforce: Agentforce Command Center', url: 'https://www.salesforce.com/agentforce/command-center/' },
  observability: { title: 'Salesforce blog: Agentforce Observability', url: 'https://www.salesforce.com/blog/agentforce-observability/' },
  actionSecurity: { title: 'Salesforce Developers: Secure Your Agentforce Custom Actions', url: 'https://developer.salesforce.com/docs/platform/isvforce/guide/secure-agentforce-actions.html' },
  agentApi: { title: 'Salesforce Developers: Agent API', url: 'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api.html' },
  promptBuilder: { title: 'Trailhead: Prompt Builder Basics', url: 'https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics' },
  multiAgent: { title: 'Salesforce: Agentforce', url: 'https://www.salesforce.com/agentforce/' },
  ascriptRef: { title: 'Agentforce Developer Guide: Agent Script Reference', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-reference.html' },
  ascriptTools: { title: 'Agentforce Developer Guide: Agent Script Tools (Reasoning Actions)', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-tools.html' },
  ascriptUtils: { title: 'Agentforce Developer Guide: Agent Script Utils', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html' },
  ascriptVariables: { title: 'Agentforce Developer Guide: Agent Script Variables', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-variables.html' },
  ascriptActions: { title: 'Agentforce Developer Guide: Agent Script Actions', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-actions.html' },
  ascriptBlocks: { title: 'Agentforce Developer Guide: Agent Script Blocks', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-blocks.html' },
  agentApiStart: { title: 'Agentforce Developer Guide: Get Started with the Agent API', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html' },
  agentApiConsiderations: { title: 'Agentforce Developer Guide: Agent API Considerations', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-considerations.html' },
  legacyGuide: { title: 'Salesforce: Agentforce Guide to Reasoning, Subagents, Instructions and Actions', url: 'https://www.salesforce.com/agentforce/legacy-guide/' },
  groundTemplates: { title: 'Trailhead: Create and Ground Prompt Templates', url: 'https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics/create-and-ground-prompt-templates' },
  fieldGeneration: { title: 'Trailhead: Build a Field Generation Prompt Template', url: 'https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics/build-a-field-generation-prompt-template' },
  trustJourney: { title: 'Trailhead: The Einstein Trust Layer, Follow the Prompt Journey', url: 'https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-prompt-journey' },
  relatedLists: { title: 'Salesforce Ben: Linking Prompt Templates to Salesforce Data', url: 'https://www.salesforceben.com/understanding-ai-grounding-linking-prompt-templates-to-salesforce-data/' },
  gptSettings: { title: 'Metadata API Developer Guide: EinsteinGptSettings', url: 'https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_einsteingptsettings.htm' },
  searchIndexTypes: { title: 'Trailhead: Get to Know Search Index Types in Data Cloud', url: 'https://trailhead.salesforce.com/content/learn/modules/search-index-types-data-cloud-quick-look/get-to-know-search-index-types-in-data-cloud' },
  retrieverTypes: { title: 'Trailblazer Community: quoting Trailhead, Create a Search Index, Retriever and Prompt Template', url: 'https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000jARc10AG' },
  testResults: { title: 'Trailhead: Agentforce Agent Testing, View Test Results', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-agent-testing/view-test-results' },
  testStrategy: { title: 'Trailhead: Refine Your Agents Using a Five-Step Testing Strategy', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-testing-tools-and-strategies/refine-your-agents-using-a-five-step-testing-strategy' },
  promptTemplateMeta: { title: 'Metadata API Developer Guide: GenAiPromptTemplate', url: 'https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaiprompttemplate.htm' },
  soma: { title: 'Salesforce Admins: When to Build a Super Agent or a Single Agent', url: 'https://admin.salesforce.com/blog/2026/what-is-soma-and-when-to-build-a-super-agent-or-a-single-agent' },
  superAgent: { title: 'Salesforce Admins: How to Set Up a Super Agent with Connected Subagents', url: 'https://admin.salesforce.com/blog/2026/how-to-set-up-a-super-agent-with-connected-subagents' },
  multiAgentPage: { title: 'Salesforce: Multi-Agent Orchestration', url: 'https://www.salesforce.com/agentforce/multi-agent-orchestration/' },
  fileLibrary: { title: 'Trailhead: Build a File-Based Data Library for an Agent', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/build-a-file-based-data-library-for-an-agent' },
  monitorStart: { title: 'Trailhead: Get Started with Agent Monitoring', url: 'https://trailhead.salesforce.com/content/learn/modules/agent-analytics-and-monitoring/get-started-with-agent-monitoring' },
  monitorMetrics: { title: 'Trailhead: Monitor Agent Metrics and Scores', url: 'https://trailhead.salesforce.com/content/learn/modules/agent-analytics-and-monitoring/monitor-agent-metrics-and-scores' },
  monitorSessions: { title: 'Trailhead: Investigate Agent Sessions and Intents', url: 'https://trailhead.salesforce.com/content/learn/modules/agent-analytics-and-monitoring/investigate-agent-sessions-and-intents' },
  monitorHealth: { title: 'Trailhead: Monitor Agent Health', url: 'https://trailhead.salesforce.com/content/learn/modules/agent-analytics-and-monitoring/monitor-agent-health' },
  slackDeploy: { title: 'Trailhead: Deploy an Agent in Slack', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-configuration-for-slack-deployment/deploy-an-agent-in-slack' },
  employeeAgents: { title: 'Trailhead: Get Started with Agentforce for Employees', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-for-employees-quick-look/get-started-with-agentforce-for-employees' },
  voiceSetup: { title: 'Trailhead: Set Up Your Agentforce Voice Agent', url: 'https://trailhead.salesforce.com/content/learn/modules/ai-integration-for-agentforce-contact-center/set-up-your-agentforce-voice-agent' },
  voiceBuild: { title: 'Trailhead: Build Your Voice-Enabled Agent', url: 'https://trailhead.salesforce.com/content/learn/modules/agentforce-voice-quick-look/build-your-voice-enabled-agent' },
  templateTypes: help('Prompt Template Types', 'ai.prompt_builder_standard_template_types'),
  templateVersions: help('Use Multiple Versions of a Prompt Template', 'ai.prompt_builder_use_multiple_versions'),
  llmConfigs: help('Change LLM Configurations in Prompt Templates', 'ai.prompt_builder_changing_llm_configurations'),
  promptBestPractices: help('Best Practices for Building Prompt Templates', 'ai.prompt_builder_best_practices'),
  modelProviders: help('Manage Model Provider Access', 'ai.generative_ai_model_provider'),
  maskConsiderations: help('LLM Data Masking Considerations and Limitations', 'ai.generative_ai_trust_data_mask_considerations'),
  promptInjection: help('Prompt Injection Detection (Beta)', 'ai.generative_ai_trust_prompt_injection_detection'),
  toxicity: help('Toxicity Detection', 'ai.generative_ai_trust_toxicity_detection'),
  relatedListHelp: help('Grounding with Related List Merge Fields', 'ai.prompt_builder_ground_related_list'),
  recordSnapshots: help('Grounding Prompts with Record Snapshots', 'ai.prompt_builder_ground_record_snapshots'),
  retrieversInTemplates: help('About Retrievers in Prompt Templates', 'ai.prompt_builder_ground_rag_about'),
  libraryConcept: help('What Are Data Libraries?', 'ai.data_library_concept'),
  librarySource: help('Choose a Data Source for Your Library', 'ai.data_library_choose_data_source'),
  libraryWeb: help('Use Web Search', 'ai.data_library_web_search'),
  libraryCustomRetriever: help('Use a Custom Retriever', 'ai.data_library_custom_retriever'),
  libraryPrepare: help('Prepare Your Source Content', 'ai.data_library_prepare'),
  ragAbout: help('About Retrieval Augmented Generation', 'ai.generative_ai_rag_about'),
  executionContext: help('Agent Execution Context and Data Access by Type', 'ai.agent_execution_data'),
  serviceAgentAccess: help('Configure Service Agent Access', 'ai.agent_user'),
  routing: help('Subagent Classification and Routing', 'ai.agent_topics_routing'),
  agentVersions: help('Versioning and Editing Agents', 'ai.agent_versions_lifecycle'),
  testModes: help('Simulate and Live Test Modes', 'ai.agent_simulate_and_live_modes'),
  emailAgent: help('Considerations for Agentforce Service Agent on Email', 'ai.service_agent_considerations_1'),
  testingConsiderations: help('Considerations for Testing Center', 'ai.agent_testing_center_considerations'),
  defaultScorers: help('Default Scorers', 'ai.agent_studio_testing_center_default_evaluations'),
  templateDeploy: help('Deployment Considerations for Prompt Templates', 'ai.prompt_builder_considerations_deployment'),
  templateChangeSets: help('Change Set Considerations for Prompt Templates', 'ai.prompt_builder_considerations_changeset'),
  multiConsider: help('Considerations and Limitations in Multi-Agent Solutions', 'ai.agent_multi_orch_consider'),
  mcp: help('MCP for Agentforce', 'ai.agent_mcp'),
  sessionTracingHelp: help('About Agentforce Session Tracing', 'ai.generative_ai_session_trace_about'),
  instructionAdherence: help('Instruction Adherence', 'ai.agent_guardrails_instruction_adherence'),
  taskResolution: help('Task Resolution', 'ai.agent_guardrails_task_resolution'),
  activateAgent: help('Activate or Deactivate Your Agent', 'ai.copilot_setup_activate_deactivate'),
  auditFeedback: help('About Generative AI Audit and Feedback Data', 'ai.generative_ai_feedback_about'),
  instructionsResolve: help('How Subagent Instructions are Resolved to Build a Prompt', 'ai.agent_topics_instructions_resolve'),
  actionInstructions: help('Best Practices for Agent Action Instructions', 'ai.copilot_actions_instructions'),
  legacyFilters: help('Create a Filter to Control Access to Subagents and Actions in the Legacy Builder', 'ai.agent_asset_filters'),
  patterns: { title: 'Agentforce Developer Guide: Agent Script Common Patterns', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns.html' },
  requiredFlow: { title: 'Agentforce Developer Guide: Enforce Required Workflows for a Subagent', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-required-flow.html' },
  systemOverrides: { title: 'Agentforce Developer Guide: Avoid Conflicting Instructions with Instruction Overrides', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-system-overrides.html' },
  actionChaining: { title: 'Agentforce Developer Guide: Action Chaining and Sequencing', url: 'https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-action-chaining.html' },
  queryRecords: help('Agentforce Platform | Query Records', 'ai.copilot_actions_ref_query_records'),
  answerKnowledge: help('Agentforce Platform | Answer Questions with Knowledge', 'ai.copilot_actions_ref_answer_questions_with_knowledge'),
  searchWeb: help('Agentforce Platform | Search the Web', 'ai.copilot_actions_ref_search_the_web'),
  templateRuntime: help('Prompt Template Run-time Execution', 'ai.prompt_builder_runtime'),
  templateLimits: help('Prompt Builder Limits', 'ai.prompt_builder_limits'),
  conditionalLogic: help('Use Conditional Logic in Prompt Templates', 'ai.prompt_builder_use_conditional_logic')
};

window.QUESTIONS = [

  // ---------------- AI Agents (35%) ----------------

  {
    id: 'AG-001',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'deterministic-gate',
    stem: [
      'A bank\'s agent must never show an account balance until the customer has passed identity verification. Testing shows the agent sometimes skips the check. What should the Agentforce Specialist do?',
      'An insurer needs its agent to confirm a policy holder\'s identity before it ever reveals policy details. The current natural-language instruction is followed most of the time but not always. What is the best fix?'
    ],
    options: [
      { correct: true, text: 'Set a verification variable with deterministic logic and gate the sensitive action with `available when` on that variable.', why: 'The platform hides a gated action from the LLM until the condition is true, so it can\'t be called early.' },
      { correct: false, text: 'Rewrite the subagent instructions in capital letters so the LLM treats the rule as more important.', why: 'Still a prompt instruction. The LLM can still ignore it.' },
      { correct: false, text: 'Add the rule to the agent\'s description so the router sees it on every turn.', why: 'The description helps routing. It doesn\'t enforce anything.' },
      { correct: false, text: 'Add a Testing Center test case for unverified customers.', why: 'Testing finds the problem. It doesn\'t stop it happening.' },
      { correct: false, text: 'Lower the model temperature in the Trust Layer so the LLM is more consistent.', why: 'There is no such Trust Layer setting, and consistency isn\'t a guarantee.' }
    ],
    explanation: 'Hybrid reasoning says: if you can express a decision as code, write it as logic. `available when` is a platform-enforced gate. The LLM can\'t call an action it can\'t see.\n\nThe gate variable should be set deterministically. Letting the LLM set it brings the variability back.',
    source: SRC.hybrid
  },

  {
    id: 'AG-002',
    section: 'agents',
    objective: 'Explain hybrid reasoning, including Agent Script in Canvas and Script view',
    stem: 'Which two statements about Canvas view and Script view in Agentforce Builder are true?',
    options: [
      { correct: true, text: 'Both views edit the same agent, stored as Agent Script in one text file.', why: 'Canvas builds the exact same agent as Script view.' },
      { correct: true, text: 'Script view suits fast, precise edits and digging into error messages.', why: 'That is how Salesforce describes Script view.' },
      { correct: false, text: 'An agent built in Canvas view can\'t be opened in Script view.', why: 'They are two views of the same script.' },
      { correct: false, text: 'Script view agents run on a different reasoning engine from Canvas view agents.', why: 'Both compile to the same Agent Graph run by the Atlas Reasoning Engine.' },
      { correct: false, text: 'Canvas view is read-only and used only to review an agent.', why: 'Canvas is the default editor, with "/" and "@" shortcuts for adding logic.' },
      { correct: false, text: 'Agents must be rebuilt from scratch when moving from Canvas view to Script view.', why: 'You switch views on the same agent.' }
    ],
    explanation: 'A new agent opens in Canvas view. Canvas groups the Agent Script into visual blocks you can expand. Script view shows the raw Agent Script with syntax highlighting, autocompletion and validation.\n\nBoth edit the same file. There\'s also a pro-code path: the agent lives in an `.agent` file inside an AiAuthoringBundle, edited in VS Code with Agentforce DX.',
    source: SRC.agentScript
  },

  {
    id: 'AG-003',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'script-arrow-pipe',
    stem: [
      'In Agent Script reasoning instructions, what does a line that starts with `|` represent?',
      'A subagent\'s reasoning block contains the line `| Thank the customer for being a Platinum member!`. How is this line handled?'
    ],
    options: [
      { correct: true, text: 'Natural-language prompt text added to the prompt for the LLM.', why: '`|` marks a prompt instruction.' },
      { correct: false, text: 'Deterministic logic that runs before the LLM is called.', why: 'That is `->`, which marks hybrid (logic) instructions.' },
      { correct: false, text: 'A comment that the compiler ignores.', why: 'It is part of the prompt the LLM sees.' },
      { correct: false, text: 'A pipe that passes one action\'s output into the next action.', why: 'Action chaining uses `run` and variables, not `|`.' },
      { correct: false, text: 'A message sent to the customer word for word without the LLM.', why: 'The LLM uses it to decide its response. It isn\'t sent verbatim.' }
    ],
    explanation: 'Reasoning instructions come in two kinds. Lines starting with `->` are logic: conditions, running actions, setting variables and transitions. Lines starting with `|` are prompt text for the LLM.\n\nLogic is resolved first. In `if @variables.LifetimeValue >= 50000:` followed by a `|` line, a customer below 50000 never has that text in their prompt at all.',
    source: SRC.agentScript
  },

  {
    id: 'AG-004',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'reasoning-zones',
    stem: [
      'An agent must load the customer\'s loyalty tier into a variable each time a subagent is processed, before the LLM is called. Where should this logic go?',
      'Where in a subagent should an admin put an entitlement check that must run with no LLM involvement at the start of every parse?'
    ],
    options: [
      { correct: true, text: '`before_reasoning`', why: 'Runs at the start of every parse with no LLM. Made for context hydration and checks.' },
      { correct: false, text: '`after_reasoning`', why: 'Runs after reasoning completes. Too late for context the LLM needs.' },
      { correct: false, text: 'A `|` prompt instruction in `reasoning`', why: 'That asks the LLM to do it, which isn\'t guaranteed.' },
      { correct: false, text: 'The `system` block', why: 'Holds global instructions and messages such as welcome and error messages.' },
      { correct: false, text: 'The `config` block', why: 'Holds agent identity: developer name, agent user and type.' }
    ],
    explanation: 'Each subagent has three zones. `before_reasoning` runs first with no LLM. `reasoning` mixes logic and prompt instructions. `after_reasoning` runs after reasoning with no LLM and suits post-action checks and deterministic transitions.\n\nA parse happens on first entry to a subagent, after each action returns, and on each new user turn in the same subagent.',
    source: SRC.hybrid
  },

  {
    id: 'AG-005',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'available-when',
    stem: [
      'An action has `available when @variables.interest != ""`. The variable `interest` is still an empty string. What happens?',
      'What does Agent Script do with an action whose `available when` condition evaluates to False?'
    ],
    options: [
      { correct: true, text: 'The action is left out of the LLM\'s list of tools, so the LLM can\'t call it.', why: 'A false gate hides the action.' },
      { correct: false, text: 'The action runs with empty inputs and returns an error.', why: 'It never reaches the LLM\'s tool list, so it can\'t run.' },
      { correct: false, text: 'The LLM sees the action and asks the user to confirm before running it.', why: 'The LLM doesn\'t see it at all.' },
      { correct: false, text: 'The agent transitions to the default subagent.', why: '`available when` controls action visibility only.' }
    ],
    explanation: '`available when` gates whether an action appears in the LLM\'s tool list. Any false value hides it: `None`, `False`, `0` or an empty string.\n\nThis is a filter enforced by the platform, not a request to the LLM.',
    source: SRC.hybrid
  },

  {
    id: 'AG-006',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'reasoning-zones',
    stem: 'An admin puts a `transition to` statement in a subagent\'s `before_reasoning` block. What is the risk?',
    options: [
      { correct: true, text: 'It fires on every parse and can cause loops.', why: '`before_reasoning` runs at the start of every parse.' },
      { correct: false, text: 'The compiler rejects `transition to` anywhere except `start_agent`.', why: 'Transitions are allowed in subagents. `after_reasoning` is the usual place.' },
      { correct: false, text: 'The LLM ignores the transition because `before_reasoning` is only advice.', why: '`before_reasoning` is deterministic. Nothing in it is advice.' },
      { correct: false, text: 'The variable values are reset when the transition happens.', why: 'Transitions don\'t reset variables.' }
    ],
    explanation: 'Salesforce\'s guidance is to keep `transition to` out of `before_reasoning` because it fires on every parse. Put deterministic transitions in `after_reasoning`.\n\nOne caveat: if an action has `is_displayable: True`, the loop exits once its output is shown and `after_reasoning` is skipped. Then the orchestration goes in the next subagent\'s `before_reasoning`.',
    source: SRC.hybrid
  },

  {
    id: 'AG-007',
    section: 'agents',
    objective: 'Identify when to use an Employee or Service agent',
    group: 'agent-type',
    stem: [
      'A retailer wants an agent on its public website that answers order status questions for customers. The customers are not Salesforce users. Which type of agent fits?',
      'A utility company wants an agent in its customer self-service portal to help customers book meter readings. Which agent type should it use?'
    ],
    options: [
      { correct: true, text: 'A service agent', why: 'Built for external customers. It runs as a dedicated agent user.' },
      { correct: false, text: 'An employee agent', why: 'Employee agents serve internal users and run as the signed-in user.' },
      { correct: false, text: 'A Prompt Builder flex template', why: 'A template generates text. It doesn\'t hold a conversation.' },
      { correct: false, text: 'An Einstein Bot with no Agentforce licence', why: 'A legacy, rules-based bot. It doesn\'t use agent reasoning.' }
    ],
    explanation: 'Service agents talk to customers on channels such as web chat, messaging and voice. They run as a dedicated agent user, so their access is set by that user\'s permission sets.\n\nEmployee agents work for internal users inside Salesforce and Slack, with the access of the signed-in user.',
    source: SRC.actionSecurity
  },

  {
    id: 'AG-008',
    section: 'agents',
    objective: 'Identify when to use an Employee or Service agent',
    group: 'agent-type',
    stem: 'Sales reps want an agent in Lightning Experience that summarises their opportunities and drafts follow-up emails, seeing only records they already have access to. Which agent type fits?',
    options: [
      { correct: true, text: 'An employee agent', why: 'Runs for internal users with the signed-in user\'s access.' },
      { correct: false, text: 'A service agent', why: 'Runs as a separate agent user and is built for customers.' },
      { correct: false, text: 'An Experience Cloud guest user agent', why: 'Guest users are for unauthenticated site visitors.' },
      { correct: false, text: 'An Agent API integration', why: 'The Agent API is for calling an agent from an outside app.' }
    ],
    explanation: 'Employee agents run in the context of the user who is talking to them. The rep\'s own sharing and permissions decide what the agent can read. That is what "only records they already have access to" needs.',
    source: SRC.actionSecurity
  },

  {
    id: 'AG-009',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'agent-user',
    stem: [
      'A service agent\'s custom action updates Case records through a flow. It fails for every customer, but the flow works when the admin runs it. What is the most likely cause?',
      'A service agent can find a customer\'s orders but gets an error when its action tries to update the order status. The same flow works for the admin. Where should the admin look first?'
    ],
    options: [
      { correct: true, text: 'The agent user\'s permission sets don\'t grant edit access to the object or fields.', why: 'Service agents run as the agent user, so its access decides what actions can do.' },
      { correct: false, text: 'The customers lack edit access to the records.', why: 'Customers aren\'t the running user for a service agent.' },
      { correct: false, text: 'The Trust Layer masked the record Id so the update had no target.', why: 'Masking applies to text sent to the LLM, not to record Ids in actions.' },
      { correct: false, text: 'The flow must be converted to Apex before an agent can call it.', why: 'Agents can call flows directly as actions.' }
    ],
    explanation: 'A service agent runs as its assigned agent user, not as the customer. That user\'s profile and permission sets decide what records and fields every action can touch.\n\nGive the agent user a dedicated permission set with least privilege: only the objects and fields it needs.',
    source: SRC.actionSecurity
  },

  {
    id: 'AG-010',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    stem: 'Which two practices help keep a service agent\'s access to the minimum it needs?',
    options: [
      { correct: true, text: 'Give the agent user a dedicated permission set with only the objects and fields its actions need.', why: 'Least privilege for the identity the agent runs as.' },
      { correct: true, text: 'Require user verification before private actions that return non-public data or change records.', why: 'Salesforce says private actions need at least user verification.' },
      { correct: false, text: 'Assign the System Administrator profile so no action fails.', why: 'Gives the agent far more access than it needs.' },
      { correct: false, text: 'Run every flow in system context without sharing.', why: 'Bypasses sharing. Run in user context where possible.' },
      { correct: false, text: 'Share the agent user\'s login with the support team.', why: 'Never share credentials. The agent user is for the agent.' }
    ],
    explanation: 'Classify custom actions as public or private. Private actions return non-public data or change records, and need user verification at minimum.\n\nKeep the agent user\'s access tight with its own permission set and sensible sharing.',
    source: SRC.actionSecurity
  },

  {
    id: 'AG-011',
    section: 'agents',
    objective: 'Identify when to use the Agent API',
    stem: [
      'A company has its own mobile app, not built on Salesforce. It wants the app to hold conversations with its Agentforce service agent. What should it use?',
      'A developer needs to start a session with an Agentforce agent from an external system and send it messages programmatically. Which option fits?'
    ],
    options: [
      { correct: true, text: 'The Agent API', why: 'Built for calling an agent from outside Salesforce.' },
      { correct: false, text: 'An Experience Cloud site embedded in an iframe', why: 'Works around the problem instead of integrating.' },
      { correct: false, text: 'The Prompt Builder template REST resource', why: 'Runs a single template, not a conversation with an agent.' },
      { correct: false, text: 'Email-to-Case with an agent on the email channel', why: 'Not a programmatic, real conversation from an app.' }
    ],
    explanation: 'The Agent API lets external apps start an agent session, send messages and get the agent\'s replies. It needs an external client app (connected app) set up for authentication.\n\nUse it when the conversation has to happen in your own interface rather than a Salesforce channel.',
    source: SRC.agentApi
  },

  {
    id: 'AG-012',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'variables',
    stem: 'An agent needs the current messaging session\'s Id so its actions can use it. The value must come from the session and never be changed by the agent. How should it be declared?',
    options: [
      { correct: true, text: 'As a linked variable with `source: @MessagingSession.Id`', why: 'Linked variables are read-only and bound to session data.' },
      { correct: false, text: 'As a `mutable` string with a default of empty', why: 'Mutable means the agent can change it.' },
      { correct: false, text: 'As a `|` prompt instruction asking the LLM for the Id', why: 'The LLM can\'t know the session Id and might invent one.' },
      { correct: false, text: 'As a value in the `config` block', why: '`config` holds agent identity, not runtime session data.' }
    ],
    explanation: 'Linked variables are read-only, have no default and are bound to session data at runtime. For example `session_id: linked string` with `source: @MessagingSession.Id`.\n\n`mutable` variables can be changed by the agent. Variables without `mutable` keep their value.',
    source: SRC.agentScript
  },

  {
    id: 'AG-013',
    section: 'agents',
    objective: 'Select and configure standard and custom topics and actions',
    stem: 'An agent must look up delivery status in an external order management system through its REST API. No standard action does this. What should the Agentforce Specialist create?',
    options: [
      { correct: true, text: 'A custom agent action that calls a flow or invocable Apex using a named credential.', why: 'Custom actions wrap flows, Apex or prompt templates.' },
      { correct: false, text: 'A new standard action in Setup', why: 'Standard actions come from Salesforce. You can\'t create new ones.' },
      { correct: false, text: 'A prompt template that asks the LLM for the delivery status', why: 'The LLM has no access to the external system and would guess.' },
      { correct: false, text: 'An Agentforce Data Library loaded with yesterday\'s order export', why: 'Gives stale data, not a current lookup.' }
    ],
    explanation: 'Standard actions cover common jobs such as querying records or summarising. When nothing standard fits, create a custom action backed by a flow, invocable Apex or a prompt template.\n\nCallouts should use a named credential so the endpoint and authentication sit in Setup, not in code.',
    source: SRC.actionSecurity
  },

  {
    id: 'AG-014',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    stem: 'Which blocks are the minimum required in an Agent Script file?',
    options: [
      { correct: true, text: '`system`, `config` and `start_agent`', why: 'These three are the minimum.' },
      { correct: false, text: '`system`, `variables` and `subagent`', why: 'Variables and subagents are optional.' },
      { correct: false, text: '`config`, `language` and `before_reasoning`', why: '`language` and `before_reasoning` are optional.' },
      { correct: false, text: '`start_agent` and at least two `subagent` blocks', why: 'An agent can work with no subagents.' }
    ],
    explanation: '`system` holds global instructions and messages. `config` holds the agent\'s identity. `start_agent` is the entry point that runs on every user message (the agent router).\n\n`variables`, `language` and `subagent` blocks are added as needed.',
    source: SRC.agentScript
  },

  {
    id: 'AG-015',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'template-expression',
    stem: [
      'In a subagent\'s prompt instructions, how do you insert the current value of the variable `order_status` so the LLM sees the value itself?',
      'An admin wants the welcome message to include the customer\'s preferred name stored in `userPreferredName`. Which syntax inserts the value?'
    ],
    options: [
      { correct: true, text: 'A template expression such as `{!@variables.order_status}`', why: '`{! }` resolves a variable or resource inside prompt text.' },
      { correct: false, text: '`@variables.order_status` written straight into the `|` text', why: 'That form is for logic instructions. In prompt text, wrap it in `{! }`.' },
      { correct: false, text: '`{{order_status}}`', why: 'Not Agent Script syntax.' },
      { correct: false, text: '`$order_status`', why: 'Not Agent Script syntax.' },
      { correct: false, text: '`run @variables.order_status`', why: '`run` executes actions, not variables.' }
    ],
    explanation: 'Template expressions use `{!expression}`. At run time Agent Script swaps in the actual value, so the LLM sees "Shipped" rather than a variable name. Use `{!@variables.name}` for variables and `{!@actions.name}` to point the LLM at a tool.\n\nIn logic instructions (after `->`) you reference variables directly as `@variables.name`.',
    source: SRC.ascriptVariables
  },

  {
    id: 'AG-016',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'slot-fill',
    stem: [
      'A tool is defined with `with order_id = ...`. What does the `...` do?',
      'What is the slot-fill token in Agent Script used for?'
    ],
    options: [
      { correct: true, text: 'It tells the LLM to work out the value from the conversation (slot filling).', why: '`...` is the slot-fill token.' },
      { correct: false, text: 'It passes every variable in the agent to the action.', why: 'Only the named input is filled.' },
      { correct: false, text: 'It leaves the input empty so the action uses its default.', why: 'The LLM is asked to supply the value.' },
      { correct: false, text: 'It reuses the value from the previous turn.', why: 'That would be binding to a variable, such as `= @variables.order_id`.' }
    ],
    explanation: '`with order_id = @variables.order_id` binds the input deterministically. `with order_id = ...` asks the LLM to extract it from what the customer said.\n\nAgentforce only tries to slot-fill inputs that are required and unbound.',
    source: SRC.ascriptRef
  },

  {
    id: 'AG-017',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'tools-vs-actions',
    stem: 'A subagent has an `actions` block and a `reasoning.actions` block. What is the difference?',
    options: [
      { correct: true, text: '`actions` defines actions you can run from logic. `reasoning.actions` lists the tools the LLM can choose to call.', why: 'Subagent actions are for logic. Reasoning actions are tools for the LLM.' },
      { correct: false, text: '`actions` is for flows and `reasoning.actions` is for Apex.', why: 'Both can point at flows, Apex or prompt templates.' },
      { correct: false, text: 'They are the same. The second is kept for backwards compatibility.', why: 'They do different jobs.' },
      { correct: false, text: '`reasoning.actions` runs every time the subagent runs. `actions` only runs when the LLM decides.', why: 'The other way round. `run` in logic always runs. Tools run at the LLM\'s choice.' }
    ],
    explanation: 'Define an action once in the subagent\'s `actions` block (description, inputs, outputs, target). Call it from logic with `run`, or expose it to the LLM by pointing to it from `reasoning.actions`.\n\nReasoning actions are also called tools because they can include utils such as transitions and `@utils.setVariables`, not only actions. In Canvas view the split is handled for you.',
    source: SRC.ascriptTools
  },

  {
    id: 'AG-018',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'tools-vs-actions',
    stem: [
      'A business-hours check must run every time a subagent runs, whatever the LLM decides. How should it be called?',
      'An action must run on every parse of a subagent and store its output in variables. Which approach guarantees this?'
    ],
    options: [
      { correct: true, text: '`run @actions.check_business_hours` in the logic part of the reasoning instructions', why: 'Logic runs deterministically, so the action runs every time.' },
      { correct: false, text: 'List it in `reasoning.actions` with a clear description', why: 'The LLM chooses whether to call a tool.' },
      { correct: false, text: 'Mention it in a `|` prompt with `{!@actions.check_business_hours}`', why: 'Points the LLM at the tool, but the LLM still decides.' },
      { correct: false, text: 'Set `require_user_confirmation: True`', why: 'Asks the customer to confirm. It doesn\'t force the action to run.' }
    ],
    explanation: '`run @actions.name` in logic instructions runs the action each time the subagent is parsed. Follow it with `set @variables.x = @outputs.x` to keep the result.\n\nTools in `reasoning.actions` only run if the LLM picks them.',
    source: SRC.ascriptActions
  },

  {
    id: 'AG-019',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'transition-vs-delegate',
    stem: [
      'A subagent needs to consult a specialist subagent and then carry on in the original subagent. How should the specialist be referenced in `reasoning.actions`?',
      'Which reference runs another subagent like a tool and then returns control to the calling subagent?'
    ],
    options: [
      { correct: true, text: 'Directly, as `@subagent.specialist`', why: 'A direct subagent reference returns to the caller when done.' },
      { correct: false, text: '`@utils.transition to @subagent.specialist`', why: 'Transitions are one way. Control never returns.' },
      { correct: false, text: '`@utils.escalate`', why: 'Escalates to a human rep.' },
      { correct: false, text: '`@utils.setVariables`', why: 'Lets the LLM set variable values.' }
    ],
    explanation: 'Delegating with `@subagent.name` works like calling a tool: the other subagent runs, then flow returns to the original subagent.\n\n`@utils.transition to` hands over for good. If you want to come back, you need an explicit transition back, and that starts the original subagent from the beginning.',
    source: SRC.ascriptTools
  },

  {
    id: 'AG-020',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'transition-vs-delegate',
    stem: 'Subagent A transitions to subagent B with `transition to`. Later B transitions back to A. Where does A start?',
    options: [
      { correct: true, text: 'At the beginning of subagent A', why: 'A transition back starts the subagent from the top.' },
      { correct: false, text: 'At the line after the original `transition to`', why: 'Transitions don\'t remember where they left.' },
      { correct: false, text: 'At the `start_agent` block', why: 'The transition targets A, not the router.' },
      { correct: false, text: 'It doesn\'t. You can\'t transition back to a subagent you have left.', why: 'You can, with an explicit transition.' }
    ],
    explanation: '`transition to` runs immediately, stops the current block and passes control to the new subagent. There is no automatic return. A transition back starts the target subagent from the beginning.',
    source: SRC.ascriptUtils
  },

  {
    id: 'AG-021',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'escalate',
    stem: [
      'An admin adds `escalate_to_human: @utils.escalate` to a subagent, but escalation doesn\'t work. What is missing?',
      'What does `@utils.escalate` need before it can hand a conversation to a human service rep?'
    ],
    options: [
      { correct: true, text: 'An active Omni-Channel connection, set in a `connection messaging` block with an outbound route type and name', why: 'Escalation routes through Omni-Channel.' },
      { correct: false, text: 'A prompt template that writes the handover message', why: 'The escalation message is set on the connection block.' },
      { correct: false, text: 'A Slack workspace connected to the org', why: 'Slack isn\'t needed for escalation.' },
      { correct: false, text: 'A Testing Center test that covers escalation', why: 'Tests check behaviour. They don\'t enable it.' }
    ],
    explanation: 'The `connection messaging` block sets `escalation_message`, `outbound_route_type` (for example `"OmniChannelFlow"`) and `outbound_route_name`. `@utils.escalate` then hands the conversation to a human through that route.\n\n`escalate` is a reserved word, so you can\'t use it as a subagent or action name.',
    source: SRC.ascriptUtils
  },

  {
    id: 'AG-022',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'utils',
    stem: 'Which util lets the agent end the conversation, for example once the customer says they need no more help?',
    options: [
      { correct: true, text: '`@utils.end_session`', why: 'Ends the conversation immediately.' },
      { correct: false, text: '`@utils.escalate`', why: 'Hands over to a human. The session carries on.' },
      { correct: false, text: '`@utils.transition to @subagent.start_agent`', why: 'Moves back to routing. It doesn\'t end anything.' },
      { correct: false, text: '`@utils.setVariables`', why: 'Sets variable values.' }
    ],
    explanation: 'The utils are `transition to`, `setVariables`, `escalate` and `end_session`. Each can be exposed to the LLM as a tool with its own description and `available when` condition.',
    source: SRC.ascriptUtils
  },

  {
    id: 'AG-023',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'action-properties',
    stem: [
      'An action cancels a customer\'s order. The customer must agree before it runs. Which action property should be set?',
      'Which action property makes the agent ask the customer to confirm before the action runs?'
    ],
    options: [
      { correct: true, text: '`require_user_confirmation: True`', why: 'The customer must confirm first.' },
      { correct: false, text: '`include_in_progress_indicator: True`', why: 'Shows a progress indicator while the action runs.' },
      { correct: false, text: '`filter_from_agent: True` on the output', why: 'Hides the output from the agent\'s context.' },
      { correct: false, text: '`available when @variables.confirmed == True`', why: 'Works only if something sets `confirmed`. The property is the direct way.' }
    ],
    explanation: 'Action properties include `description`, `inputs`, `outputs`, `target`, `label`, `include_in_progress_indicator` and `require_user_confirmation`. The description matters most: the LLM reads it when deciding whether to call the action.',
    source: SRC.ascriptActions
  },

  {
    id: 'AG-024',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'action-properties',
    stem: 'An action returns an internal risk score. Later logic needs it, but the LLM must never see it or mention it. What should the admin do?',
    options: [
      { correct: true, text: 'Set `filter_from_agent: True` on that output.', why: 'Keeps the output out of the agent\'s context.' },
      { correct: false, text: 'Add a prompt instruction telling the LLM not to mention the score.', why: 'The LLM still sees it and might reveal it.' },
      { correct: false, text: 'Turn on Trust Layer data masking for the field.', why: 'Masking works on prompt text sent to the LLM, not on hiding action outputs.' },
      { correct: false, text: 'Leave the output undefined.', why: 'Then the logic can\'t store or use it either.' }
    ],
    explanation: 'By default an action\'s outputs stay in the agent\'s context for the whole session, so the LLM can use them in answers. `filter_from_agent: True` keeps an output out of that context while logic can still store it with `set`.',
    source: SRC.ascriptActions
  },

  {
    id: 'AG-025',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    stem: 'Which three target types can an Agent Script action\'s `target` point to?',
    options: [
      { correct: true, text: '`apex://`', why: 'Apex is a supported target.' },
      { correct: true, text: '`flow://`', why: 'Flow is a supported target.' },
      { correct: true, text: '`prompt://`', why: 'Prompt templates are a supported target.' },
      { correct: false, text: '`lwc://`', why: 'Not an action target type.' },
      { correct: false, text: '`report://`', why: 'Not an action target type.' },
      { correct: false, text: '`email://`', why: 'Not an action target type.' }
    ],
    explanation: 'Targets use the form `{TARGET_TYPE}://{DEVELOPER_NAME}`, for example `flow://Get_Order` or `prompt://check_bookings`.',
    source: SRC.ascriptActions
  },

  {
    id: 'AG-026',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'variables',
    stem: [
      'An external app calls the Agent API and needs to set a custom variable\'s value. What must the variable have?',
      'An admin wants to change a custom variable\'s value while testing the agent in simulate mode. Which property allows this?'
    ],
    options: [
      { correct: true, text: '`visibility: "External"`', why: 'Lets an API set the value, and lets you change it in simulate mode.' },
      { correct: false, text: '`visibility: "Internal"`', why: 'The default. Only the agent can set it.' },
      { correct: false, text: 'It must be a `linked` variable', why: 'Linked variables can\'t be set at all. They come from their source.' },
      { correct: false, text: 'A `description` property', why: 'Helps the LLM set it. It doesn\'t open it to APIs.' }
    ],
    explanation: 'Custom variables can have `mutable`, `description`, `label` and `visibility`. Visibility defaults to `Internal`. Set `External` to let an API set the value.',
    source: SRC.ascriptVariables
  },

  {
    id: 'AG-027',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'variables',
    stem: 'Which two statements about linked variables are true?',
    options: [
      { correct: true, text: 'They can\'t have a default value.', why: 'The value always comes from the source.' },
      { correct: true, text: 'The agent can\'t set their value.', why: 'They are read-only.' },
      { correct: false, text: 'They can hold a list of objects.', why: 'Linked variables can\'t be objects or lists.' },
      { correct: false, text: 'They must be declared `mutable`.', why: 'They can\'t be changed by the agent.' },
      { correct: false, text: 'Their source can be any field on any object.', why: 'Sources are `@MessagingSession`, `@MessagingEndUser` and `@VoiceCall` properties.' }
    ],
    explanation: 'A linked variable is tied to a source, for example `contact_id: linked string` with `source: @MessagingEndUser.ContactId`. Supported sources include `@MessagingSession.Id`, `@MessagingSession.EndUserLanguage`, `@MessagingEndUser.ContactId` and `@VoiceCall.Id`.',
    source: SRC.ascriptVariables
  },

  {
    id: 'AG-028',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'variables',
    stem: 'A string variable `member_email` might never have been set, or might be an empty string. How should a condition check that it has no usable value?',
    options: [
      { correct: true, text: 'Check for both `is None` and `== ""`', why: 'Covers "never set" and "set to empty".' },
      { correct: false, text: 'Check `== 0`', why: 'That is for numbers.' },
      { correct: false, text: 'Check `== False`', why: 'That is for booleans.' },
      { correct: false, text: 'Check `is None` only', why: 'Misses a variable set to an empty string.' }
    ],
    explanation: '`None` means the variable has no value and works for any type. Strings can also be set to `""`. For string checks, Salesforce suggests testing both.',
    source: SRC.ascriptVariables
  },

  {
    id: 'AG-029',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'agent-user',
    stem: [
      'In Agent Script, where is the user that a service agent runs as defined?',
      'Which Agent Script setting decides whose permissions a service agent uses to reach Salesforce data?'
    ],
    options: [
      { correct: true, text: '`default_agent_user` in the `access` block', why: 'Required for service agents. The agent runs as this user.' },
      { correct: false, text: '`default_agent_user` in the `config` block', why: 'Deprecated there. It now belongs in the `access` block.' },
      { correct: false, text: 'The `system` block\'s instructions', why: 'Instructions guide the LLM. They don\'t set a running user.' },
      { correct: false, text: '`agent_type: AgentforceEmployeeAgent`', why: 'Sets the agent type, not the user.' }
    ],
    explanation: 'An agent runs in the context of a user, and that user\'s permissions grant or deny access to Salesforce data. For service agents, `default_agent_user` in the `access` block holds that user\'s username.\n\n`agent_type` in `config` is `AgentforceServiceAgent` (the default) or `AgentforceEmployeeAgent`.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'AG-030',
    section: 'agents',
    objective: 'Explain the components and benefits of hybrid reasoning',
    stem: [
      'An admin turns off one runtime setting to make a knowledge agent reply faster. Soon after, it starts giving answers not backed by the knowledge articles. Which setting was turned off?',
      'Which `runtime` setting checks the LLM\'s responses against source content to reduce hallucinations?'
    ],
    options: [
      { correct: true, text: '`groundedness`', why: 'On by default. It checks answers against source content.' },
      { correct: false, text: '`citation`', why: 'Adds source references to answers. It doesn\'t check them.' },
      { correct: false, text: '`streaming`', why: 'Controls whether the reply arrives in chunks.' },
      { correct: false, text: '`reset_to_initial_node`', why: 'Restarts each turn at `start_agent`.' }
    ],
    explanation: 'The `runtime` sub-block of `config` covers `streaming`, `thought_chunks`, `citation`, `groundedness` and `reset_to_initial_node`. The groundedness check takes extra time but reduces hallucinations. Leave it on for knowledge-heavy agents.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'AG-031',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    stem: [
      'Which block runs on every customer message and handles subagent classification, filtering and routing?',
      'In Canvas view, what is the Agent Router in Agent Script?'
    ],
    options: [
      { correct: true, text: 'The `start_agent` block', why: 'Called the Agent Router in Canvas view.' },
      { correct: false, text: 'The `system` block', why: 'Holds global instructions and messages.' },
      { correct: false, text: 'The `config` block', why: 'Holds agent settings and identity.' },
      { correct: false, text: 'The first `subagent` block in the file', why: 'Order in the file doesn\'t make a subagent the router.' }
    ],
    explanation: '`start_agent` is a special subagent. Every customer utterance starts there, and it usually decides which subagent handles the request, often through `@utils.transition to` tools gated with `available when`.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'AG-032',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'routing',
    stem: [
      'Customers asking about returns keep getting routed to the Order Status subagent. What should the Agentforce Specialist improve first?',
      'An agent often picks the wrong subagent for a request. What does the reasoning engine mainly use to choose a subagent?'
    ],
    options: [
      { correct: true, text: 'The subagents\' names and descriptions: clear, distinct and using the customer\'s own words', why: 'Classification relies on the name and description.' },
      { correct: false, text: 'Add more actions to the Returns subagent', why: 'Actions are chosen after the subagent is picked.' },
      { correct: false, text: 'Add more instructions to the Returns subagent', why: 'Instructions are used after the subagent is picked.' },
      { correct: false, text: 'Increase the conversation history sent to the LLM', why: 'Doesn\'t fix overlapping descriptions.' }
    ],
    explanation: 'The reasoning engine matches the message to a subagent using the subagent\'s name and description (the classification description in the older builder). Overlapping descriptions cause misrouting.\n\nOnce a subagent is chosen, its scope, instructions and actions are added to the prompt.',
    source: SRC.legacyGuide
  },

  {
    id: 'AG-033',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    stem: 'Which two match Salesforce\'s design guidance for an agent?',
    options: [
      { correct: true, text: 'Around 10 to 15 subagents per agent', why: 'More, overlapping subagents reduce consistency.' },
      { correct: true, text: 'No more than 15 actions per subagent', why: 'Keeps latency and confusion down.' },
      { correct: false, text: 'At least 25 subagents, so every request has its own', why: 'Too many overlapping subagents hurt routing.' },
      { correct: false, text: 'One action per subagent', why: 'Not a rule. Subagents often need several actions.' },
      { correct: false, text: 'Put every instruction in the system block so all subagents share it', why: 'Instructions belong with the subagent they apply to.' }
    ],
    explanation: 'Salesforce recommends about 10 to 15 subagents per agent and no more than 15 actions per subagent. If an agent outgrows that, consider splitting it into several agents.',
    source: SRC.legacyGuide
  },

  {
    id: 'AG-034',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'deterministic-gate',
    stem: [
      'A refund must never be given for orders older than 30 days. Where should this rule be enforced?',
      'Which is the most reliable place for a critical business rule such as a refund limit?'
    ],
    options: [
      { correct: true, text: 'In the action\'s own logic (the flow or Apex that processes the refund)', why: 'Code always enforces it, whatever the LLM does.' },
      { correct: false, text: 'In the subagent instructions', why: 'Instructions are interpreted by the LLM and aren\'t deterministic.' },
      { correct: false, text: 'In the action\'s description', why: 'Descriptions help the LLM choose the action. They don\'t enforce rules.' },
      { correct: false, text: 'In the welcome message, so customers know the rule', why: 'Telling customers isn\'t enforcing it.' }
    ],
    explanation: 'Instructions are non-deterministic. Salesforce\'s guidance is to put critical business rules in the action\'s code, or in deterministic Agent Script logic, rather than in natural-language instructions.',
    source: SRC.legacyGuide
  },

  {
    id: 'AG-035',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'variables',
    stem: 'In the Agentforce builder, which statement about context variables and custom variables is true?',
    options: [
      { correct: true, text: 'Custom variables can be updated by actions. Context variables come from the session and don\'t change during it.', why: 'Context variables are set at session start.' },
      { correct: false, text: 'Context variables can store action outputs.', why: 'Only custom variables can be action outputs.' },
      { correct: false, text: 'Only context variables can be used in filters.', why: 'Both kinds can be used in filters.' },
      { correct: false, text: 'Custom variables are filled from the pre-chat form.', why: 'Pre-chat data feeds context variables.' }
    ],
    explanation: 'Context variables come from the messaging session: Messaging Session fields, pre-chat data and earlier sessions. They are inputs to actions and filters but don\'t change.\n\nCustom variables store action outputs, track state such as "verified" and link actions together.',
    source: SRC.legacyGuide
  },

  {
    id: 'AG-036',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'deterministic-gate',
    stem: 'Account and payment subagents must only be available once a customer is verified. What is the deterministic way to do this?',
    options: [
      { correct: true, text: 'Gate the router\'s transitions to those subagents with `available when @variables.verified == True` (a filter in the older builder).', why: 'Unavailable subagents can\'t be chosen.' },
      { correct: false, text: 'Tell the router in its instructions to check verification first.', why: 'Instructions aren\'t deterministic.' },
      { correct: false, text: 'Mention "verified customers only" in the subagent descriptions.', why: 'Descriptions guide classification. They don\'t block it.' },
      { correct: false, text: 'Remove the subagents and add their actions to every other subagent.', why: 'Makes the problem worse.' }
    ],
    explanation: 'Filters (older builder) and `available when` (Agent Script) are system-level gates. They include or exclude subagents and actions based on variable values before the LLM chooses. Fewer options also improve routing accuracy.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'AG-037',
    section: 'agents',
    objective: 'Identify when to use the Agent API',
    group: 'agent-api-setup',
    stem: [
      'What must be set up in Salesforce before an external system can call the Agent API?',
      'A developer is preparing to call the Agent API from a server-side integration. What do they need to create first?'
    ],
    options: [
      { correct: true, text: 'An external client app with the client credentials flow and the api, chatbot_api and sfap_api scopes', why: 'All Agent API calls need a token from such an app.' },
      { correct: false, text: 'An Experience Cloud site with guest access', why: 'Not used by the Agent API.' },
      { correct: false, text: 'A Prompt Builder Flex template for each message', why: 'The API talks to an agent, not a template.' },
      { correct: false, text: 'A named credential pointing at the external system', why: 'Named credentials are for Salesforce calling out, not for calling in.' }
    ],
    explanation: 'Create an external client app, enable OAuth with the api, refresh_token/offline_access, chatbot_api and sfap_api scopes, and turn on the client credentials flow with a Run As user. Use the consumer key and secret to get a token, then start a session.\n\nUse your My Domain URL, not the lightning.force.com domain.',
    source: SRC.agentApiStart
  },

  {
    id: 'AG-038',
    section: 'agents',
    objective: 'Identify when to use the Agent API',
    group: 'agent-api-setup',
    stem: 'An Agent API call to start a session includes `"bypassUser": true`. What does that do?',
    options: [
      { correct: true, text: 'The session runs as the agent\'s assigned user rather than the user tied to the token.', why: 'True means use the agent user.' },
      { correct: false, text: 'It skips authentication for the call.', why: 'A token is always required.' },
      { correct: false, text: 'It skips the Trust Layer for faster replies.', why: 'Not what this flag does.' },
      { correct: false, text: 'It lets anonymous users call the API without a token.', why: 'A token is always required.' }
    ],
    explanation: 'With `bypassUser` true, the API uses the user assigned to the agent. With false, it uses the user associated with the token. The client credentials example sets it to true.',
    source: SRC.agentApiStart
  },

  {
    id: 'AG-039',
    section: 'agents',
    objective: 'Identify when to use the Agent API',
    stem: [
      'Which statement about the Agent API is true?',
      'A team plans to use the Agent API. Which consideration should they know about?'
    ],
    options: [
      { correct: true, text: 'It isn\'t supported for agents of type "Agentforce (Default)".', why: 'Stated in the Agent API considerations.' },
      { correct: false, text: 'Calls have no timeout, so long actions always finish.', why: 'There is a 120-second timeout.' },
      { correct: false, text: 'Usage doesn\'t consume any credits.', why: 'Agent API usage affects credit consumption.' },
      { correct: false, text: 'It only works with employee agents.', why: 'Service agents are the common case.' }
    ],
    explanation: 'Agent API considerations: not supported for "Agentforce (Default)" agents, a 120-second timeout (a timed-out call returns HTTP 500), usage counts towards credits, and Government Cloud uses `api.gov.salesforce.com`.',
    source: SRC.agentApiConsiderations
  },

  {
    id: 'AG-040',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'voice',
    stem: [
      'Where do you configure how an Agentforce Voice agent sounds, such as its voice and speaking speed?',
      'A voice agent mispronounces a medicine name. Where can a custom pronunciation be added?'
    ],
    options: [
      { correct: true, text: 'The `modality voice` block', why: 'Controls voice, speed, pronunciation and turn-taking.' },
      { correct: false, text: 'The `language` block', why: 'Sets supported locales.' },
      { correct: false, text: 'The `system` block\'s welcome message', why: 'Sets what is said, not how it sounds.' },
      { correct: false, text: 'A Prompt Builder template', why: 'Templates generate text. They don\'t configure speech.' }
    ],
    explanation: '`modality voice` sets the voice, speed, style, a pronunciation dictionary, filler phrases while actions run and silence handling.\n\nVoice needs a fixed locale. With `adaptive: True` in the language block, adaptive mode is ignored on voice channels, so set a `default_locale`.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'AG-041',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    stem: 'An employee agent should remember a user\'s preferences across conversations. How is this turned on, and what else is needed?',
    options: [
      { correct: true, text: 'Enable `memory` in the `context` block. Each employee in Lightning Experience also opts in.', why: 'Employee agent users opt in individually.' },
      { correct: false, text: 'Make every variable `mutable`.', why: 'Variables last for a session, not across conversations.' },
      { correct: false, text: 'Set `reset_to_initial_node: False`.', why: 'Controls where each turn starts, not memory.' },
      { correct: false, text: 'Store preferences in a linked variable.', why: 'Linked variables are read-only session data.' }
    ],
    explanation: 'The `context` block has `memory` and `user_profile`, both off by default. Memory lets the agent recall details from earlier conversations. Turning it off later stops new memories but keeps the existing ones.\n\n`user_profile` adds the user\'s name, locale and time zone to the prompt.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'AG-042',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    stem: 'A service agent should chat with customers on the company\'s Experience Cloud help site. Which setup is used?',
    options: [
      { correct: true, text: 'An Enhanced Chat (Messaging for In-App and Web) channel with an Omni-Channel flow that routes conversations to the agent', why: 'The standard way to put a service agent on a website.' },
      { correct: false, text: 'An employee agent added to the site\'s utility bar', why: 'Employee agents are for internal users.' },
      { correct: false, text: 'Email-to-Case with the agent reading the inbox', why: 'Email, not chat.' },
      { correct: false, text: 'The Agent API called from the site\'s footer', why: 'Possible for custom builds, but not the standard setup.' }
    ],
    explanation: 'Service agents use Omni-Channel. An Omni-Channel flow routes the messaging conversation to the agent, and the Enhanced Chat deployment puts the chat window on the site. The same Omni-Channel set-up is used to escalate to a human.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'AG-043',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'slack',
    stem: [
      'An admin has requested a Slack connection for an employee agent in Agentforce Builder. Who can approve and install it in Slack?',
      'Where does a Slack admin approve an Agentforce agent for a workspace?'
    ],
    options: [
      { correct: true, text: 'A Slack org or workspace owner or admin, in the Slack Admin Dashboard on the Salesforce | Agentforce tab', why: 'They review the agent\'s permissions, allow it and pick workspaces.' },
      { correct: false, text: 'Any Slack user, by typing the agent\'s name in a channel', why: 'Installation needs admin approval.' },
      { correct: false, text: 'Only Salesforce Support, by raising a case', why: 'Admins do this themselves.' },
      { correct: false, text: 'The agent user, by logging in to Slack', why: 'The agent user doesn\'t install apps.' }
    ],
    explanation: 'In Slack: Tools & settings > Organization settings opens the Admin Dashboard. On the Salesforce | Agentforce tab, select Review next to the agent, check its permissions, select Allow, choose the workspaces and save.\n\nAdmins can later see the workspaces, member permissions and agent permissions there.',
    source: SRC.slackDeploy
  },

  {
    id: 'AG-044',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'slack',
    stem: [
      'Some employees use Slack but have no Salesforce CRM licence. How can they use an employee agent in Slack?',
      'Which statement about employee agents in Slack is true?'
    ],
    options: [
      { correct: true, text: 'With a Salesforce identity licence they can use Agentforce in Slack without an extra CRM licence, by @mentioning the agent or using the Agentforce Hub.', why: 'Identity licences cover non-CRM Slack users.' },
      { correct: false, text: 'They each need a full Sales Cloud licence.', why: 'An identity licence is enough.' },
      { correct: false, text: 'They can\'t. Agents in Slack are for CRM users only.', why: 'Non-CRM users can use them.' },
      { correct: false, text: 'They must use the Agent API from a custom Slack bot.', why: 'Agentforce in Slack is built in.' }
    ],
    explanation: 'Any employee can call an employee agent in Slack with an @mention in a channel or direct message. The Agentforce Hub in Slack lists the available agents. Employee agents consume Flex Credits.',
    source: SRC.employeeAgents
  },

  {
    id: 'AG-045',
    section: 'agents',
    objective: 'Identify when to use an Employee or Service agent',
    group: 'agent-type',
    stem: [
      'A manager and a team member ask the same employee agent for account details. Why might they see different results?',
      'Whose permissions does an employee agent follow when it answers a question?'
    ],
    options: [
      { correct: true, text: 'The agent runs as the person it is helping, so each sees only what their own access allows.', why: 'Employee agents follow the user\'s permissions and org security.' },
      { correct: false, text: 'The agent picks randomly from the records it finds.', why: 'Results follow the user\'s access.' },
      { correct: false, text: 'The agent runs as a shared agent user with the same access for everyone.', why: 'That is how service agents work.' },
      { correct: false, text: 'Managers always get system administrator access through the agent.', why: 'The agent never raises a user\'s access.' }
    ],
    explanation: 'Employee agents are role-based helpers that run in the user\'s context and follow their permissions and the org\'s security settings. Service agents run as a dedicated agent user.',
    source: SRC.employeeAgents
  },

  {
    id: 'AG-046',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    stem: [
      'An employee agent needs to answer questions from the company knowledge base. Which standard subagent and action does it use?',
      'Which standard action lets an agent draw answers from the knowledge base?'
    ],
    options: [
      { correct: true, text: 'The General FAQ subagent with the Answer Questions with Knowledge action', why: 'The standard pair for knowledge answers.' },
      { correct: false, text: 'A custom Apex action that queries Knowledge articles', why: 'Possible, but a standard action already does this.' },
      { correct: false, text: 'The Escalation subagent with the Transfer action', why: 'Hands over to a human.' },
      { correct: false, text: 'A Field Generation prompt template', why: 'Fills a field. It doesn\'t answer questions.' }
    ],
    explanation: 'Employee agents come with subagents and actions for common uses. The General FAQ subagent and the Answer Questions with Knowledge action answer from the knowledge base and other data, such as an Agentforce Data Library.\n\nCheck for a standard action before building a custom one.',
    source: SRC.employeeAgents
  },

  {
    id: 'AG-047',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'voice',
    stem: [
      'An admin is setting up an Agentforce voice agent for inbound calls. Which order is correct?',
      'What must be done before inbound call routing can be configured for a voice agent?'
    ],
    options: [
      { correct: true, text: 'Create a service agent, add a Telephony connection, set the voice, activate the agent, then build the flow that routes calls to it', why: 'Activation comes before inbound routing.' },
      { correct: false, text: 'Build the routing flow first, then create the agent', why: 'The agent must exist and be active first.' },
      { correct: false, text: 'Create an employee agent and connect it to Slack huddles', why: 'Inbound customer calls use a service agent.' },
      { correct: false, text: 'Upload call recordings to a Data Library', why: 'Not part of voice setup.' }
    ],
    explanation: 'Start from the Agentforce Service Agent template, with a default language supported for voice. Under Connections, add Telephony. Configure Voice Settings, save and activate. Then build the flow that connects the agent to telephony routing and decides when a call goes to a human.',
    source: SRC.voiceBuild
  },

  {
    id: 'AG-048',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'voice',
    stem: [
      'A voice agent keeps mishearing the brand name "Ursa Major" when customers say it. Which voice setting helps?',
      'What is the difference between key-term prompting and the pronunciation dictionary in Agentforce voice settings?'
    ],
    options: [
      { correct: true, text: 'Key-term prompting improves how the agent recognises terms customers say. The pronunciation dictionary controls how the agent says them.', why: 'One is listening, the other is speaking.' },
      { correct: false, text: 'The pronunciation dictionary fixes recognition. Key-term prompting changes the voice persona.', why: 'The other way round, and neither changes the persona.' },
      { correct: false, text: 'Both change only the speaking speed.', why: 'Speed is a separate setting.' },
      { correct: false, text: 'Neither exists. Only the persona can be changed.', why: 'Both are advanced voice settings.' }
    ],
    explanation: 'Advanced voice settings include speed, similarity, stability, a pronunciation dictionary and key-term prompting. Use key-term prompting with care, only when the agent fails to recognise certain terms.',
    source: SRC.voiceBuild
  },

  {
    id: 'AG-049',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'voice',
    stem: 'A voice agent escalates a complex call to a human rep. What does the rep receive?',
    options: [
      { correct: true, text: 'The full transcript, including sentiment analysis, so the customer doesn\'t repeat themselves', why: 'Context passes with the call.' },
      { correct: false, text: 'Nothing. The rep starts from scratch.', why: 'The transcript is passed on.' },
      { correct: false, text: 'Only the customer\'s phone number', why: 'The full transcript is passed.' },
      { correct: false, text: 'A recording that the rep must listen to first', why: 'The transcript is provided.' }
    ],
    explanation: 'The routing flow decides how calls reach the agent, what customer context is captured and when to transfer to a human. On transfer the rep gets the whole conversation with sentiment.',
    source: SRC.voiceSetup
  },

  {
    id: 'AG-050',
    section: 'agents',
    objective: 'Identify when to use an Employee or Service agent',
    stem: 'Which two statements about employee agents are true?',
    options: [
      { correct: true, text: 'They can be deployed in Salesforce, in Slack and on mobile.', why: 'All three are supported.' },
      { correct: true, text: 'They consume Flex Credits.', why: 'Usage-based credits.' },
      { correct: false, text: 'They run as a dedicated agent user with its own permissions.', why: 'That describes service agents.' },
      { correct: false, text: 'They are only for customers on the company website.', why: 'That describes service agents.' },
      { correct: false, text: 'They can\'t be customised beyond the default subagents.', why: 'Agentforce Builder lets you add subagents and actions.' }
    ],
    explanation: 'Employee agents help staff with work such as account summaries, sales emails and HR questions. In Salesforce, users open the Agentforce panel in the app they are using and switch between agents. In Slack, they @mention the agent or use the Agentforce Hub.',
    source: SRC.employeeAgents
  },

  {
    id: 'AG-051',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'verification',
    stem: [
      'A service agent is deployed with Enhanced Chat to an Experience Cloud site, with credential-based user verification turned on. Whose access applies?',
      'When does a service agent run as the logged-in site user instead of the agent user?'
    ],
    options: [
      { correct: true, text: 'The logged-in site user\'s profile, permissions, field-level security and sharing, when credential-based user verification is on for an Experience Cloud site', why: 'Credential-based verification switches the context.' },
      { correct: false, text: 'Always the agent user, whatever the channel', why: 'Credential-based verification changes this.' },
      { correct: false, text: 'The system administrator who built the agent', why: 'Agents never run as their builder.' },
      { correct: false, text: 'The Agentforce Guest User', why: 'That is for unidentified users.' }
    ],
    explanation: 'Without credential-based user verification, a service agent runs as the agent user (EinsteinServiceAgent User). With it switched on for Enhanced Chat on an Experience Cloud site, the agent runs as the logged-in site user.',
    source: SRC.executionContext
  },

  {
    id: 'AG-052',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'verification',
    stem: [
      'A service agent knows the customer\'s contact Id from `MessagingSession.ContactId`. Does that limit which records the agent can return?',
      'What do context variables such as `MessagingSession.ContactId` do for a service agent?'
    ],
    options: [
      { correct: true, text: 'They tell the agent who the user is, but don\'t control data access. The customer can reach whatever the agent user can, unless you scope it.', why: 'You must limit access yourself.' },
      { correct: false, text: 'They restrict every query to that contact\'s records automatically.', why: 'They don\'t control access.' },
      { correct: false, text: 'They switch the agent to run as that contact.', why: 'Contacts aren\'t users.' },
      { correct: false, text: 'They encrypt the customer\'s data.', why: 'Not what context variables do.' }
    ],
    explanation: 'Help warns that without extra configuration the customer has access to all records the agent user can see. Scope actions to the verified customer and filter subagents and actions.',
    source: SRC.executionContext
  },

  {
    id: 'AG-053',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'verification',
    stem: 'Which two steps limit a service agent to the verified customer\'s own records?',
    options: [
      { correct: true, text: 'Scope the flows and Apex behind actions with a condition such as `WHERE ContactId = VerifiedCustomerId`', why: 'Restricts the data each action returns.' },
      { correct: true, text: 'Add filters so subagents and actions are only available when `VerifiedCustomerId is not None`', why: 'Blocks access until the customer is verified.' },
      { correct: false, text: 'Tell the agent in its instructions to only show the customer\'s own data', why: 'Instructions aren\'t enforcement.' },
      { correct: false, text: 'Give the agent user the System Administrator profile', why: 'Widens access.' },
      { correct: false, text: 'Rely on `MessagingSession.ContactId` alone', why: 'Context variables don\'t control access.' }
    ],
    explanation: 'The standard Customer Verification and Service Customer Verification subagents store the verified Id in `VerifiedCustomerId`. Some standard actions, such as Get Cases for Verified Contact, already check it. Test and customise each action.',
    source: SRC.serviceAgentAccess
  },

  {
    id: 'AG-054',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'agent-user',
    stem: [
      'A new service agent needs to read Product records. Where should the admin grant this?',
      'Which statement about a new service agent user is true?'
    ],
    options: [
      { correct: true, text: 'In the agent\'s `[Agent_Name]_Permissions` permission set. The agent user starts with minimal access and uses the Einstein Agent licence and profile.', why: 'Secure by default, extended by least privilege.' },
      { correct: false, text: 'It starts with full access, which should be reduced later.', why: 'It starts with minimal access.' },
      { correct: false, text: 'In any permission set, whatever licence it is tied to.', why: 'Permission sets must suit the Einstein Agent licence and profile.' },
      { correct: false, text: 'Agent users can\'t be given object access.', why: 'They are managed like other users.' }
    ],
    explanation: 'The agent user (EinsteinServiceAgent User) has the Einstein Agent licence, the Einstein Agent User profile, the Agentforce Service Agent Secure Base permission set and an agent-specific permissions set. Enhanced Messaging also needs access to the Messaging Session object.\n\nOnly admins can view or edit agent users.',
    source: SRC.serviceAgentAccess
  },

  {
    id: 'AG-055',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'agent-user',
    stem: [
      'An unidentified visitor starts a service agent chat on Enhanced Web Chat for the first time. Which user record is created?',
      'What is the Agentforce Guest User?'
    ],
    options: [
      { correct: true, text: 'An Agentforce Guest User with minimal permissions, no permission sets and no record access', why: 'Handles unauthenticated conversations safely.' },
      { correct: false, text: 'A full Salesforce user for each visitor', why: 'Visitors don\'t get user records.' },
      { correct: false, text: 'A Contact record with Community licence', why: 'Not what happens.' },
      { correct: false, text: 'An Experience Cloud guest user with access to all public records', why: 'The Agentforce Guest User can\'t access records.' }
    ],
    explanation: 'For unidentified and verified-but-not-logged-in customers, the agent runs as the agent user. Data access follows the agent user\'s profile, permissions, field-level security and sharing.',
    source: SRC.serviceAgentAccess
  },

  {
    id: 'AG-056',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    group: 'agent-user',
    stem: 'A service agent runs as its agent user. Which sharing settings apply to it?',
    options: [
      { correct: true, text: 'Org-wide defaults for internal users, plus its role and sharing rules', why: 'The agent user is an internal user.' },
      { correct: false, text: 'External org-wide defaults, because it talks to customers', why: 'Internal OWD apply to the agent user.' },
      { correct: false, text: 'No sharing at all. Agents see everything.', why: 'Sharing applies.' },
      { correct: false, text: 'The customer\'s sharing settings', why: 'The customer isn\'t the running user.' }
    ],
    explanation: 'Restrict internal OWD, assign the agent user a role that gives just the record access it needs, and use sharing rules to open access selectively. Follow least privilege.',
    source: SRC.serviceAgentAccess
  },

  {
    id: 'AG-057',
    section: 'agents',
    objective: 'Explain the security context the agent runs in and how it affects actions',
    stem: [
      'A service agent action calls a flow that runs in system context without sharing. What access does it have?',
      'Why is a flow in system context without sharing risky behind a service agent action?'
    ],
    options: [
      { correct: true, text: 'All objects and fields, with sharing ignored, so it can return records the customer shouldn\'t see', why: 'Full access, no sharing.' },
      { correct: false, text: 'Only the customer\'s records', why: 'Nothing restricts it to the customer.' },
      { correct: false, text: 'Only the agent user\'s records', why: 'System context without sharing ignores the agent user\'s sharing.' },
      { correct: false, text: 'No access, so it fails', why: 'It has full access.' }
    ],
    explanation: 'Flows run in user context, system context with sharing, or system context without sharing. Both the flow\'s context and the agent\'s context apply. Without credential-based verification, the flow\'s running user is the agent user, not the customer.',
    source: SRC.executionContext
  },

  {
    id: 'AG-058',
    section: 'agents',
    objective: 'Identify when to use an Employee or Service agent',
    group: 'agent-type',
    stem: [
      'Which agent runs as a dedicated EinsteinSDRAgent User and engages leads through outbound email?',
      'A sales team wants an agent to email new leads around the clock, answer their questions and book meetings. Which agent type fits?'
    ],
    options: [
      { correct: true, text: 'A Lead Nurturing agent', why: 'Top-of-funnel outreach running as EinsteinSDRAgent User.' },
      { correct: false, text: 'An employee agent', why: 'Runs as the signed-in internal user.' },
      { correct: false, text: 'A service agent on Enhanced Chat', why: 'For customers who start a chat.' },
      { correct: false, text: 'A Flex prompt template', why: 'Generates text. It doesn\'t run outreach.' }
    ],
    explanation: 'Lead Nurturing agents work 24/7 by email. Prospects are assigned to them by assignment rules, automation or sales users. They run as the EinsteinSDRAgent User, which gets system-level permissions during setup.',
    source: SRC.executionContext
  },

  {
    id: 'AG-059',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    stem: 'Which channels does an employee agent support?',
    options: [
      { correct: true, text: 'Lightning Experience, the Salesforce mobile app, Slack, and Enhanced Web Chat v1 on Experience Cloud sites', why: 'The supported employee channels.' },
      { correct: false, text: 'Outbound email only', why: 'That is Lead Nurturing.' },
      { correct: false, text: 'Public websites for anonymous visitors', why: 'Employee agents aren\'t for unauthenticated customers.' },
      { correct: false, text: 'Telephony only', why: 'Voice is a service agent channel.' }
    ],
    explanation: 'Employee agents serve internal users and run as the logged-in user, so queries don\'t need to be scoped to the user by hand. Access to employee agents is managed with permission sets or profiles.',
    source: SRC.executionContext
  },

  {
    id: 'AG-060',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'routing',
    stem: [
      'A subagent should only ever be reached by a transition from another subagent, never chosen directly from the customer\'s first message. What should the admin do?',
      'How can you stop the Agent Router from selecting a particular subagent?'
    ],
    options: [
      { correct: true, text: 'Remove the subagent\'s transition from the Agent Router\'s reasoning actions, or add a filter to it', why: 'The router can only pick subagents it has transitions to.' },
      { correct: false, text: 'Delete the subagent\'s description', why: 'The subagent stays available and routing gets worse.' },
      { correct: false, text: 'Rename it with a leading underscore', why: 'Names can\'t start with an underscore and this doesn\'t hide it.' },
      { correct: false, text: 'Move it to the end of the script', why: 'Order doesn\'t control routing.' }
    ],
    explanation: 'The Agent Router compares recent conversation history with the names and descriptions of the subagents in its reasoning actions. You can edit it like any subagent: add conditions, actions and variables, filter subagents out, or make a different subagent the starting one.',
    source: SRC.routing
  },

  {
    id: 'AG-061',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'routing',
    stem: [
      'Which model do agents created from the default Employee and Service templates in the new builder use for subagent classification?',
      'What happens if `model_config` is removed from the `start_agent` block?'
    ],
    options: [
      { correct: true, text: 'The Salesforce HyperClassifier model. Without `model_config`, classification uses the Agentforce model option chosen in Setup.', why: 'Both statements are from Help.' },
      { correct: false, text: 'Always the same LLM used for responses. `model_config` is ignored.', why: 'The router has its own model setting.' },
      { correct: false, text: 'A keyword matcher with no AI', why: 'HyperClassifier is a model.' },
      { correct: false, text: 'The agent stops routing when `model_config` is removed.', why: 'It falls back to the Setup choice.' }
    ],
    explanation: 'From April 2026, default-template agents use `model: "model://sfdc_ai__DefaultEinsteinHyperClassifier"` in the router\'s `model_config`. Salesforce says it beats standard LLMs for speed and precision, especially with complex or negative instructions.',
    source: SRC.routing
  },

  {
    id: 'AG-062',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'agent-versions',
    stem: [
      'An admin has finished changes to an agent draft and wants to activate it. What must happen first?',
      'Which statement about agent versions in the new Agentforce Builder is true?'
    ],
    options: [
      { correct: true, text: 'Commit the version, which saves a snapshot to metadata and locks it. Only committed versions can be activated.', why: 'Drafts can\'t be activated.' },
      { correct: false, text: 'Drafts can be activated directly.', why: 'A draft must be committed first.' },
      { correct: false, text: 'A committed version can still be edited.', why: 'Committed versions are locked. Create a draft to keep editing.' },
      { correct: false, text: 'Versions are only available through the Metadata API.', why: 'You switch versions from the builder\'s header.' }
    ],
    explanation: 'Create the agent (an editable draft), change and test it, commit it, then activate. To keep iterating, create a new draft version. You can compare versions and copy changes between them.',
    source: SRC.agentVersions
  },

  {
    id: 'AG-063',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'test-modes',
    stem: [
      'An admin wants to check an agent picks the right subagents and actions without changing any data. Which preview mode fits?',
      'What is the difference between Simulate and Live Test modes in Agentforce Builder?'
    ],
    options: [
      { correct: true, text: 'Simulate mode checks configuration and logic without changing data. Live Test mode runs real actions and updates Salesforce data.', why: 'Risk-free first, realistic second.' },
      { correct: false, text: 'Live Test mode never changes data.', why: 'It runs actions as if the agent were active.' },
      { correct: false, text: 'Simulate mode can only be used in production.', why: 'It is a builder preview mode.' },
      { correct: false, text: 'They are the same.', why: 'One changes data and one doesn\'t.' }
    ],
    explanation: 'Use Simulate mode to confirm configuration, then Live Test mode to check actions, data and integrations under near-production conditions. The preview gives a step-by-step trace of what the agent did.',
    source: SRC.testModes
  },

  {
    id: 'AG-064',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'email-agent',
    stem: [
      'A customer emails a photo of a damaged item to a service agent on email. What does the agent use to respond?',
      'Which parts of an inbound email does Agentforce Service Agent on Email process?'
    ],
    options: [
      { correct: true, text: 'Only the text in the subject and body. Images and attachments aren\'t processed.', why: 'Stated limitation.' },
      { correct: false, text: 'The subject, body and all attachments', why: 'Attachments aren\'t processed.' },
      { correct: false, text: 'Only the attachments', why: 'It uses the subject and body.' },
      { correct: false, text: 'Only the subject line', why: 'The body is processed too.' }
    ],
    explanation: 'Email responses are asynchronous and timing varies. The agent replies in the customer\'s language if it is in the allowed languages, otherwise in the default language, or English if none is set.',
    source: SRC.emailAgent
  },

  {
    id: 'AG-065',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'email-agent',
    stem: 'Which two statements about Agentforce Service Agent on Email are true?',
    options: [
      { correct: true, text: 'It doesn\'t reply to emails whose headers show an automated response, such as out-of-office.', why: 'Prevents auto-reply loops.' },
      { correct: true, text: 'It doesn\'t process new inbound emails on closed cases.', why: 'Stated limitation.' },
      { correct: false, text: 'It closes the case automatically when the conversation ends.', why: 'It doesn\'t. Use a scheduled flow for that.' },
      { correct: false, text: 'It can be told in its instructions not to reply to some emails.', why: 'Suppressing a reply isn\'t supported.' },
      { correct: false, text: 'It uses the Welcome system message in its first reply.', why: 'Welcome and Error messages aren\'t used on email.' }
    ],
    explanation: 'The agent always sends a reply unless a human escalation is requested or a runtime error happens. To step in yourself, reassign the case from the agent to yourself.',
    source: SRC.emailAgent
  },

  {
    id: 'AG-066',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'email-agent',
    stem: [
      'What happens when Agentforce Service Agent on Email hits a runtime error on a case?',
      'A service agent on email fails while handling a case. Where does the case go?'
    ],
    options: [
      { correct: true, text: 'A case comment is added with the error details and the case is reassigned to the org\'s default case owner.', why: 'So a person can pick it up.' },
      { correct: false, text: 'The case is deleted.', why: 'Cases aren\'t deleted.' },
      { correct: false, text: 'The customer gets the Error system message by email.', why: 'System messages aren\'t used on email.' },
      { correct: false, text: 'Nothing. The case waits for the agent to retry.', why: 'It is reassigned.' }
    ],
    explanation: 'For the agent to use Case Assignment Rules, its user needs View access on Case. To update cases, it needs View and Update. Grant no more than that.',
    source: SRC.emailAgent
  },

  {
    id: 'AG-067',
    section: 'agents',
    objective: 'Connect agents to channels such as digital experience, email, voice and Slack',
    group: 'email-agent',
    stem: 'What is the default daily limit on inbound emails handled by Agentforce Service Agent on Email?',
    options: [
      { correct: true, text: '5,000 transactions a day', why: 'The default, which Support can raise after consistent use.' },
      { correct: false, text: '500 a day', why: 'Too low.' },
      { correct: false, text: '50,000 a day', why: 'Too high for the default.' },
      { correct: false, text: 'Unlimited', why: 'There is a daily limit.' }
    ],
    explanation: 'Other email limits: Reply All is limited to 20 recipients across To and CC, the MessagingSession record isn\'t available on email, and Salesforce for Outlook Email-to-Case routing addresses aren\'t supported.',
    source: SRC.emailAgent
  },

  {
    id: 'AG-068',
    section: 'agents',
    objective: 'Explain the components and benefits of hybrid reasoning',
    group: 'resolve',
    stem: [
      'When an agent enters a subagent, what happens to the logic in its reasoning instructions before the LLM is called?',
      'Which statement about resolving a subagent\'s reasoning instructions is true?'
    ],
    options: [
      { correct: true, text: 'It is resolved top to bottom with no LLM: variables are replaced, inline actions run and conditions are applied, exactly as written', why: 'Logic runs before any reasoning.' },
      { correct: false, text: 'The LLM reads the logic and decides which lines to run', why: 'No LLM is used at this stage.' },
      { correct: false, text: 'Logic lines run in random order for variety', why: 'They run in the order written.' },
      { correct: false, text: 'Only the first condition is evaluated', why: 'Every logical expression is run.' }
    ],
    explanation: 'Think of logic as what the agent must do before reasoning, and prompt text as what it should consider during reasoning. Once resolved, the instructions contain real values, for example "the expected delivery date for order 1234 is February 10".',
    source: SRC.instructionsResolve
  },

  {
    id: 'AG-069',
    section: 'agents',
    objective: 'Explain the components and benefits of hybrid reasoning',
    group: 'resolve',
    stem: 'Which three are included in the prompt sent to the LLM after a subagent\'s instructions are resolved?',
    options: [
      { correct: true, text: 'Agent-level instructions', why: 'They apply to every interaction.' },
      { correct: true, text: 'The recent conversation history, including the latest message', why: 'Gives the LLM context.' },
      { correct: true, text: 'The resolved subagent instructions and the subagent\'s reasoning actions', why: 'What to consider and what it can do.' },
      { correct: false, text: 'Every other subagent\'s instructions', why: 'Only the current subagent\'s.' },
      { correct: false, text: 'The Apex source code of each action', why: 'Actions are described, not sent as code.' },
      { correct: false, text: 'All records the agent user can access', why: 'Only what instructions and actions bring in.' }
    ],
    explanation: 'If a transition runs while the instructions are being resolved, the agent moves to the new subagent before any reasoning happens. Otherwise the resolved prompt goes to the LLM, which decides the next step.',
    source: SRC.instructionsResolve
  },

  {
    id: 'AG-070',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'action-instructions',
    stem: [
      'Which action description is most effective for an action that updates a phone number?',
      'An agent sometimes calls the wrong action for phone number changes. Which description best helps it choose correctly?'
    ],
    options: [
      { correct: true, text: '"Updates the user\'s phone number on their contact record. If no matching contact exists, creates a new contact record."', why: 'Says what, on which record, and edge cases.' },
      { correct: false, text: '"Updates a phone number."', why: 'Too vague to tell actions apart.' },
      { correct: false, text: '"Provides the ability to update data."', why: 'Generic phrasing repeated across actions.' },
      { correct: false, text: '"Phone."', why: 'Not a description.' }
    ],
    explanation: 'Action instructions are usually one to three sentences written as an instruction to the LLM: the goal, use cases, and the objects or records used or changed. More relevant detail helps the LLM tell actions apart.',
    source: SRC.actionInstructions
  },

  {
    id: 'AG-071',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'action-instructions',
    stem: 'An agent has actions named Get Order, Get Shipment, Get Invoice and Get Refund, all described with "Provides the ability to...". What does Salesforce suggest?',
    options: [
      { correct: true, text: 'Vary the verbs (Get, Find, Identify, Retrieve) and remove phrases repeated across descriptions', why: 'LLMs work best with varied, distinct language.' },
      { correct: false, text: 'Make all names identical so the LLM treats them the same', why: 'Makes choosing harder.' },
      { correct: false, text: 'Add "Provides the ability to" to every input as well', why: 'More repetition.' },
      { correct: false, text: 'Merge all four into one action', why: 'Not the advice.' }
    ],
    explanation: 'Similar names and repeated boilerplate make actions hard to tell apart. Distinct verbs and specific descriptions help the reasoning engine pick the right one.',
    source: SRC.actionInstructions
  },

  {
    id: 'AG-072',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'action-instructions',
    stem: 'Which two can be added to an action\'s instructions when testing shows it isn\'t used as expected?',
    options: [
      { correct: true, text: 'One to three example utterances that should trigger it, varied in wording and length', why: 'Helps match customer inputs.' },
      { correct: true, text: 'Dependent actions by API name, such as "IdentifyRecordByName must be called first"', why: 'Fixes missing or out-of-order steps.' },
      { correct: false, text: 'The full source code of the action', why: 'Not useful to the LLM.' },
      { correct: false, text: 'Twenty near-identical example utterances', why: 'Keep to one to three, with little overlap.' },
      { correct: false, text: 'A list of every other action in the org', why: 'Not helpful.' }
    ],
    explanation: 'Examples of how the action should behave can fix consistent mistakes. LLMs generally follow examples of what to do better than examples of what not to do.',
    source: SRC.actionInstructions
  },

  {
    id: 'AG-073',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'action-instructions',
    stem: [
      'Why should an input instruction say "an 18-character ID" rather than just "the record"?',
      'What should instructions for an action\'s inputs include?'
    ],
    options: [
      { correct: true, text: 'LLMs don\'t fully know Salesforce context, so state the data type, specific fields, how to get the value and any rules', why: 'Concise but detailed input instructions.' },
      { correct: false, text: 'Input instructions are ignored by the LLM', why: 'They guide how inputs are filled.' },
      { correct: false, text: 'Only the field label', why: 'Not enough detail.' },
      { correct: false, text: 'SOQL for the LLM to run', why: 'Help\'s own example says "Don\'t generate SQL or SOQL".' }
    ],
    explanation: 'Good input instructions cover the data type, specific fields or values, where the value comes from, and special rules. Output instructions say what the result is and what the agent returns, for example "a JSON object with the recipient ID, subject line and body".',
    source: SRC.actionInstructions
  },

  {
    id: 'AG-074',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'legacy-filters',
    stem: [
      'In the legacy builder, an admin wants to add a filter to an agent that is active. What must they do first?',
      'Which statement about filters in the legacy Agentforce builder is true?'
    ],
    options: [
      { correct: true, text: 'Deactivate the agent, create the filter on the Context panel\'s Filters tab, then apply it to subagents or actions', why: 'Active agents must be deactivated first.' },
      { correct: false, text: 'Filters apply to every agent in the org automatically', why: 'Applied per agent.' },
      { correct: false, text: 'Filters can only use custom variables', why: 'Context, conversation and custom variables are supported.' },
      { correct: false, text: 'Filters need Apex', why: 'They are configured with variables, operators and values.' }
    ],
    explanation: 'A filter has a name, conditions (variable, operator, value) and a rule for whether any or all conditions must be met. Restart the preview conversation to test. For customer channels, Salesforce recommends filters that require authentication for subagents and actions that do tasks for a user.',
    source: SRC.legacyFilters
  },

  {
    id: 'AG-075',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'required-flow',
    stem: [
      'Unverified customers must go through identity verification before anything else. Why is a conditional transition more reliable than `available when` alone?',
      'What is the difference between `available when` filtering and a conditional transition?'
    ],
    options: [
      { correct: true, text: 'Filtering only removes options, so the LLM can still pick something that needs no verification. A conditional transition runs before any reasoning and guarantees the route.', why: 'Filters restrict. Transitions enforce.' },
      { correct: false, text: 'They behave the same.', why: 'One leaves the choice to the LLM.' },
      { correct: false, text: '`available when` forces a transition when the condition is false.', why: 'It only hides tools.' },
      { correct: false, text: 'A conditional transition asks the LLM whether to move.', why: 'It runs as logic, with no LLM.' }
    ],
    explanation: 'Put `if @variables.verified == False:` then `transition to @subagent.Identity` at the top of the Agent Router\'s instructions. Unverified users go straight to Identity, with no subagent classification and no prompt sent to the LLM.',
    source: SRC.requiredFlow
  },

  {
    id: 'AG-076',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'required-flow',
    stem: 'Where should a required conditional transition go in a subagent\'s instructions, and why?',
    options: [
      { correct: true, text: 'At the top, because anything run before the transition is discarded and only adds latency and cost', why: 'Earlier instructions aren\'t used once the agent transitions.' },
      { correct: false, text: 'At the bottom, so all actions run first', why: 'Wastes time and money.' },
      { correct: false, text: 'In the `config` block', why: 'Transitions belong in reasoning logic.' },
      { correct: false, text: 'Anywhere. Order doesn\'t matter.', why: 'Instructions resolve top to bottom.' }
    ],
    explanation: 'Name transition tools with a `go_to_` prefix, such as `go_to_orders`, so the LLM knows they move to another subagent. Avoid names like `tool1`.',
    source: SRC.requiredFlow
  },

  {
    id: 'AG-077',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    group: 'system-override',
    stem: [
      'An event planning agent\'s global instructions say "never suggest alcohol at children\'s parties". One subagent plans a first birthday with adult guests and should suggest champagne. What is the best fix?',
      'What does adding a `system` block inside a subagent do?'
    ],
    options: [
      { correct: true, text: 'Add a `system` block to that subagent. Its instructions override the agent-level system instructions for that subagent only.', why: 'A system override removes the conflict.' },
      { correct: false, text: 'Add a conflicting `|` instruction and let the LLM decide', why: 'Conflicts can make the agent hang or behave unpredictably.' },
      { correct: false, text: 'Delete the global instruction for every subagent', why: 'The rule is still needed elsewhere.' },
      { correct: false, text: 'Create a second agent', why: 'An override is simpler.' }
    ],
    explanation: 'Subagent-level system instructions take priority. Without them, the agent-level instructions apply. Overrides also let one agent take different personas or tones, such as formal for compliance and casual for FAQs.',
    source: SRC.systemOverrides
  },

  {
    id: 'AG-078',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'chaining',
    stem: [
      'Two actions run one after another in a subagent\'s logic instructions. What must the admin do for the second action to use the first one\'s output?',
      'When actions run in reasoning instructions, how are their inputs and outputs handled?'
    ],
    options: [
      { correct: true, text: 'Set variables by hand: `set` the first output into a variable and pass it with `with` into the second', why: 'Actions in instructions run before reasoning, so nothing is inferred.' },
      { correct: false, text: 'Nothing. The LLM passes outputs between them.', why: 'No LLM is involved at this stage.' },
      { correct: false, text: 'Use a `|` instruction asking the LLM to pass the value', why: 'Logic needs explicit variables.' },
      { correct: false, text: 'Mark the second action `require_user_confirmation`', why: 'Unrelated.' }
    ],
    explanation: 'Actions run in instructions are deterministic and run before the prompt goes to the LLM. Store outputs with `set @variables.x = @outputs.y` and pass them on with `with`.',
    source: SRC.actionChaining
  },

  {
    id: 'AG-079',
    section: 'agents',
    objective: 'Manage deterministic behaviour using filters, variables and template expressions',
    group: 'chaining',
    stem: [
      'Whenever the LLM calls `get_order`, the agent must also run `check_return_eligibility` straight afterwards. How is this done?',
      'What does a `run @actions.other_action` line under a tool in `reasoning.actions` do?'
    ],
    options: [
      { correct: true, text: 'Add `run @actions.check_return_eligibility` under the `get_order` tool, so it runs automatically after the LLM calls it', why: 'A chained reasoning action.' },
      { correct: false, text: 'Ask the LLM in the instructions to remember to call both', why: 'Not guaranteed.' },
      { correct: false, text: 'Put both actions in one prompt template', why: 'Doesn\'t chain actions.' },
      { correct: false, text: 'Use `@utils.escalate` between them', why: 'Escalates to a human.' }
    ],
    explanation: 'Chaining makes multi-step workflows reliable without the LLM having to remember each step. A tool can also end with `transition to @subagent.x` to move on once it has run.',
    source: SRC.actionChaining
  },

  {
    id: 'AG-080',
    section: 'agents',
    objective: 'Explain how an agent works and the building blocks of Agent Script',
    stem: 'Which two match Salesforce\'s general guidance for building agents with Agent Script?',
    options: [
      { correct: true, text: 'Start with the fewest instructions needed, then add more as testing shows, checking for regressions each time', why: 'Simple first, then refine.' },
      { correct: true, text: 'Use the same term everywhere, for example "customer" in both "Get Customer Info" and "Verify Customer"', why: 'Mixed terms cause inconsistent behaviour.' },
      { correct: false, text: 'Write as many instructions as possible up front', why: 'Start small.' },
      { correct: false, text: 'Use technical terms rather than the words customers use', why: 'Plain customer language matches requests better.' },
      { correct: false, text: 'Avoid referencing actions and variables in instructions', why: 'Referencing them makes the agent more likely to use them.' }
    ],
    explanation: 'Also: give subagents, actions and variables specific, distinct names and descriptions, add determinism for business workflows, and reference resources directly (for example `{!@actions.lookup_order}`).',
    source: SRC.patterns
  },

  {
    id: 'AG-081',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'query-records',
    stem: [
      'A sales rep asks an employee agent: "Show me my leads and my opportunities closing this month." The standard Query Records action returns an error. Why?',
      'Which statement about the Query Records standard action is true?'
    ],
    options: [
      { correct: true, text: 'Query Records can\'t combine data from multiple objects in one request', why: 'One object per query.' },
      { correct: false, text: 'Query Records only works on custom objects', why: 'It works on searchable standard and custom objects.' },
      { correct: false, text: 'Query Records needs a prompt template for each object', why: 'It doesn\'t run prompt templates.' },
      { correct: false, text: 'The rep must use SOQL in the request', why: 'It takes natural language.' }
    ],
    explanation: 'Query Records supports English only, doesn\'t support external objects, and can filter across up to one parent-child relationship. It shows at most 50 results, even when more match.',
    source: SRC.queryRecords
  },

  {
    id: 'AG-082',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'query-records',
    stem: [
      'A user asks "Get my contact with phone 415-123-4567" and gets nothing, although the contact exists with "(415) 123 4567". Why?',
      'Why might Query Records miss a record whose field value is stored in a different format?'
    ],
    options: [
      { correct: true, text: 'There is no field normalisation, so matching depends on the exact format stored', why: 'Formats must match.' },
      { correct: false, text: 'Phone fields can never be queried', why: 'They can, in the same format.' },
      { correct: false, text: 'The Trust Layer masked the number', why: 'Masking doesn\'t affect the query.' },
      { correct: false, text: 'Query Records only searches names', why: 'It filters on field values.' }
    ],
    explanation: 'Help also advises naming the exact field and value, for example "accounts that have an Industry of Technology" rather than "my technology accounts". Ambiguous words like "top" are interpreted by the LLM. Check the plan in Agentforce Builder to see how.',
    source: SRC.queryRecords
  },

  {
    id: 'AG-083',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'query-records',
    stem: 'A user asks Query Records to filter on two fields, but can only access one of them. What happens?',
    options: [
      { correct: true, text: 'The query returns an error. Partial results aren\'t supported.', why: 'All criteria must be met.' },
      { correct: false, text: 'It returns results filtered on the one accessible field', why: 'Partial results aren\'t supported.' },
      { correct: false, text: 'It ignores field-level security', why: 'Access is respected.' },
      { correct: false, text: 'It escalates to a human', why: 'It returns an error.' }
    ],
    explanation: 'Displayed fields combine up to three fields from the query with up to ten from the object\'s search layout, with duplicates counted once.',
    source: SRC.queryRecords
  },

  {
    id: 'AG-084',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'aqwk',
    stem: [
      'Which statement about the Answer Questions with Knowledge standard action is true?',
      'An agent answers from knowledge articles. A user without access to an internal article asks about its subject. What does the action do?'
    ],
    options: [
      { correct: true, text: 'It only uses knowledge articles the requesting user can access, respecting permissions and sharing', why: 'Stated consideration.' },
      { correct: false, text: 'It uses every article, regardless of access', why: 'Access is respected.' },
      { correct: false, text: 'It needs no Data 360 or Data Library setup', why: 'Both are required.' },
      { correct: false, text: 'It can read URL and encrypted text fields', why: 'Those field types aren\'t supported.' }
    ],
    explanation: 'It uses Text, Text Area, Text Area (Long) and Text Area (Rich) knowledge fields. File sources can be text, HTML (4 MB) or PDF (100 MB). It calls the Answer Questions with Knowledge prompt template through an internal invocable action.',
    source: SRC.answerKnowledge
  },

  {
    id: 'AG-085',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'search-web',
    stem: [
      'An admin wants Search the Web results as bullet points instead of paragraphs. How?',
      'Can the prompt template behind the Search the Web action be edited?'
    ],
    options: [
      { correct: true, text: 'No. Create a new version of the General Web Search subagent with updated instructions, or add instructions in the subagent that uses the action.', why: 'The internal template can\'t be edited.' },
      { correct: false, text: 'Yes. Edit it in Prompt Builder.', why: 'It is internal-only.' },
      { correct: false, text: 'Change the search provider to You.com', why: 'Providers don\'t control formatting.' },
      { correct: false, text: 'Set Excluded Domains', why: 'Controls sources, not format.' }
    ],
    explanation: 'Search the Web retrieves current external information, such as news and competitor details, with citations. Providers include OpenAI, BrightData and You.com. It isn\'t supported in Government Cloud.',
    source: SRC.searchWeb
  },

  {
    id: 'AG-086',
    section: 'agents',
    objective: 'Select and configure standard topics, custom topics, standard actions and custom actions',
    group: 'search-web',
    stem: 'An agent\'s Search the Web action should use only five trusted industry sites. What should the admin set?',
    options: [
      { correct: true, text: 'Allowed Domains with those five sites, and no Excluded Domains', why: 'Allowed Domains restricts searches. Using both can return few or no results.' },
      { correct: false, text: 'Excluded Domains listing every other site', why: 'Use Allowed Domains to restrict.' },
      { correct: false, text: 'Both Allowed and Excluded Domains for extra safety', why: 'Help warns against using both.' },
      { correct: false, text: 'A Data Library with those sites', why: 'New web search libraries aren\'t supported.' }
    ],
    explanation: 'Up to 10 allowed or 10 excluded domains per action. Enter base domains as a comma-separated list. Domain settings apply whichever provider is selected.',
    source: SRC.searchWeb
  },

  // ---------------- Prompt Engineering (20%) ----------------

  {
    id: 'PR-001',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'template-type',
    stem: [
      'Users want AI to draft the value of a custom "Account Health" field when they click the sparkle icon in that field on the record page. Which prompt template type fits?',
      'A service manager wants a long text field on Case to be filled with a suggested resolution when an agent clicks into it. Which template type should be used?'
    ],
    options: [
      { correct: true, text: 'Field Generation', why: 'Fills a specific field on a record page.' },
      { correct: false, text: 'Sales Email', why: 'Drafts an email, not a field value.' },
      { correct: false, text: 'Flex', why: 'For custom uses with chosen inputs, invoked from flows, Apex or agents.' },
      { correct: false, text: 'Record Summary', why: 'Summarises a record for agents. It doesn\'t fill a field.' }
    ],
    explanation: 'A Field Generation template is tied to one field on one object. The field must be on a Lightning record page that uses Dynamic Forms so users see the AI option.',
    source: SRC.promptBuilder
  },

  {
    id: 'PR-002',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'template-type',
    stem: 'A template needs data from an Account, a custom Product object and a free-text input, and will be called from a flow. Which template type fits?',
    options: [
      { correct: true, text: 'Flex', why: 'Lets you define your own inputs, including several objects and text.' },
      { correct: false, text: 'Field Generation', why: 'Tied to a single field on one object.' },
      { correct: false, text: 'Sales Email', why: 'Built for email drafts to a contact or lead.' },
      { correct: false, text: 'Record Summary', why: 'Built around one record.' }
    ],
    explanation: 'Flex templates take inputs that you define, such as records of different objects or text. They are run from flows, Apex or agent actions.',
    source: SRC.promptBuilder
  },

  {
    id: 'PR-003',
    section: 'prompt',
    objective: 'Identify access controls governing prompt templates',
    group: 'template-permissions',
    stem: [
      'A team of service reps needs to run prompt templates but must not create or edit them. Which permission set should they get?',
      'An admin wants a user to create, edit and activate prompt templates in Prompt Builder. Which permission set is needed?'
    ],
    options: [
      { correct: true, text: 'Prompt Template User for reps who run templates. Prompt Template Manager for people who build them.', why: 'Run versus build is split between these two permission sets.' },
      { correct: false, text: 'Data Cloud Admin for both groups', why: 'Controls Data Cloud, not prompt templates.' },
      { correct: false, text: 'Customize Application for both groups', why: 'Too broad, and doesn\'t control running templates.' },
      { correct: false, text: 'Agentforce Service Agent User for both groups', why: 'That is for the service agent user, not for template access.' }
    ],
    explanation: 'Prompt Template Manager lets users create and manage templates in Prompt Builder. Prompt Template User lets users run templates without editing them.',
    source: SRC.promptBuilder
  },

  {
    id: 'PR-004',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    stem: 'A template must include only the account\'s open, high-priority cases from the last 30 days, formatted as a short list. Which two grounding options can do this?',
    options: [
      { correct: true, text: 'A template-triggered prompt flow that queries and formats the cases', why: 'Flows can filter and shape the data before it reaches the prompt.' },
      { correct: true, text: 'An invocable Apex method used as a grounding resource', why: 'Apex can run any query and return formatted text.' },
      { correct: false, text: 'A related list merge field on the Account', why: 'Can\'t apply custom filters such as priority and date.' },
      { correct: false, text: 'A static instruction asking the LLM to ignore closed cases', why: 'The LLM would still receive the data and might use it.' },
      { correct: false, text: 'A Field Generation template on the Case object', why: 'That is a template type, not a grounding technique.' }
    ],
    explanation: 'Record and related list merge fields are quick but can\'t filter on custom criteria. For filtered or shaped data, use a flow or Apex as the grounding resource.\n\nFilter in code rather than asking the LLM to ignore data. It costs fewer tokens and is reliable.',
    source: SRC.promptBuilder
  },

  {
    id: 'PR-005',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'trust-layer',
    stem: 'Which three are features of the Einstein Trust Layer?',
    options: [
      { correct: true, text: 'Masking sensitive data before the prompt is sent to the LLM', why: 'Data masking is part of the Trust Layer.' },
      { correct: true, text: 'Zero data retention agreements with third-party LLM providers', why: 'Providers don\'t keep prompts or responses.' },
      { correct: true, text: 'Toxicity detection on LLM responses', why: 'Responses are scored and the results kept in the audit trail.' },
      { correct: false, text: 'Fine-tuning the LLM on your CRM data to improve answers', why: 'The Trust Layer is about not handing your data to model training.' },
      { correct: false, text: 'Replacing sharing rules for records used in grounding', why: 'Grounding respects the user\'s existing access.' },
      { correct: false, text: 'Storing prompts at the LLM provider for 30 days for abuse checks', why: 'The opposite of zero data retention.' }
    ],
    explanation: 'The Trust Layer covers grounding in CRM data, masking sensitive data, toxicity detection, the audit trail with feedback, and zero data retention with LLM partners.',
    source: SRC.trust
  },

  {
    id: 'PR-006',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'trust-layer',
    stem: 'What does zero data retention mean in the Einstein Trust Layer?',
    options: [
      { correct: true, text: 'The external LLM provider doesn\'t store prompts or responses after the response is generated.', why: 'A contractual commitment with providers such as OpenAI.' },
      { correct: false, text: 'Salesforce deletes the audit trail after every session.', why: 'The audit trail is kept for review.' },
      { correct: false, text: 'CRM data never leaves the Salesforce org.', why: 'Prompts go to the LLM. They just aren\'t retained there.' },
      { correct: false, text: 'An admin setting that clears prompts from Data 360 each night.', why: 'It isn\'t a setting. It\'s an agreement with the provider.' }
    ],
    explanation: 'Zero data retention is an agreement between Salesforce and its LLM partners. Prompts and responses aren\'t kept by the provider or used to train its models. It isn\'t a switch you turn on or off.',
    source: SRC.trust
  },

  {
    id: 'PR-007',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    stem: 'An admin edits a prompt template and saves it as a new version. Users still get the old output. Why?',
    options: [
      { correct: true, text: 'The new version hasn\'t been activated. Only the active version runs.', why: 'Saving creates a version. Activating makes it the one used.' },
      { correct: false, text: 'Template changes take 24 hours to reach users.', why: 'There is no delay once a version is active.' },
      { correct: false, text: 'Users must be given Prompt Template Manager to see the new version.', why: 'Users only need to run templates.' },
      { correct: false, text: 'The Trust Layer caches the previous response for each record.', why: 'The Trust Layer doesn\'t cache responses.' }
    ],
    explanation: 'A template can have several versions but only one is active. Save, preview with real records, then activate the version you want users to get.',
    source: SRC.promptBuilder
  },

  {
    id: 'PR-008',
    section: 'prompt',
    objective: 'Best practices for writing effective prompts',
    stem: 'Which two practices improve a prompt template\'s output?',
    options: [
      { correct: true, text: 'Give the LLM a clear role and a specific task.', why: 'Clear role and task cut vague answers.' },
      { correct: true, text: 'State the format, length and tone you want.', why: 'The LLM can only match a format it\'s told about.' },
      { correct: false, text: 'Merge in every field on the record in case some are useful.', why: 'Adds noise and cost, and can expose data the task doesn\'t need.' },
      { correct: false, text: 'Keep instructions vague so the LLM can be creative.', why: 'Vague prompts give inconsistent results.' },
      { correct: false, text: 'Put the instructions after a long block of grounding data.', why: 'Clear instructions first, then the data, is easier to follow.' }
    ],
    explanation: 'Good templates set a role, a clear task and the output format. Ground them with only the data the task needs, and test with real records before activating.',
    source: SRC.promptBuilder
  },

  {
    id: 'PR-009',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    group: 'apex-grounding',
    stem: [
      'A developer writes an Apex class to supply data to a prompt template. Which two requirements must the method meet?',
      'Which two things must be true of an Apex method used as a prompt template resource?'
    ],
    options: [
      { correct: true, text: 'It is annotated with `@InvocableMethod` and a `CapabilityType` matching the template type.', why: 'This is how Prompt Builder finds the method for that template.' },
      { correct: true, text: 'It accepts a `List<Request>` whose inputs match the template\'s inputs.', why: 'The inputs must line up with the template.' },
      { correct: false, text: 'It is declared `@future` so it runs asynchronously.', why: 'The template needs the result straight away.' },
      { correct: false, text: 'It is annotated with `@AuraEnabled`.', why: 'That is for Lightning components.' },
      { correct: false, text: 'It returns raw HTML for the LLM.', why: 'It returns text or data for the prompt.' }
    ],
    explanation: 'Apex suits grounding that needs SOQL, external API data, well-formatted JSON or programmatic filtering. Once the class exists, it appears in the template\'s Resources picker and is referenced as `{!$Apex:ClassName.Prompt}`.',
    source: SRC.groundTemplates
  },

  {
    id: 'PR-010',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    group: 'apex-grounding',
    stem: 'How is the output of an Apex class `ContactEvents` referenced in a prompt template?',
    options: [
      { correct: true, text: '`{!$Apex:ContactEvents.Prompt}`', why: 'Apex resources use the `$Apex` prefix.' },
      { correct: false, text: '`{!@actions.ContactEvents}`', why: 'That is Agent Script syntax for actions.' },
      { correct: false, text: '`{!ContactEvents.Prompt}`', why: 'Missing the `$Apex:` prefix.' },
      { correct: false, text: '`$Apex.ContactEvents()`', why: 'Not merge field syntax.' }
    ],
    explanation: 'Prompt templates use merge fields such as `{!$Input:Recipient.Name}` for record data and `{!$Apex:ClassName.Prompt}` for Apex. Adding resources through the Resources picker inserts the right syntax for you.',
    source: SRC.groundTemplates
  },

  {
    id: 'PR-011',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    stem: [
      'An admin wants to ground a template with a flow that loops through case comments and passes their text to the prompt. Which flow type is needed?',
      'Which flow type, using the Add Prompt Instructions element, supplies grounding data to a prompt template?'
    ],
    options: [
      { correct: true, text: 'A Template-Triggered Prompt Flow', why: 'Built to supply data to a prompt template.' },
      { correct: false, text: 'A Record-Triggered Flow', why: 'Runs on record changes, not as a template resource.' },
      { correct: false, text: 'A Screen Flow', why: 'For user-facing screens.' },
      { correct: false, text: 'A Platform Event-Triggered Flow', why: 'Runs on events.' }
    ],
    explanation: 'A Template-Triggered Prompt Flow gets data, for example looping through case comments, and adds text with the Add Prompt Instructions element. It then appears under Flows in the template\'s resource picker.',
    source: SRC.fieldGeneration
  },

  {
    id: 'PR-012',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    stem: 'A template is grounded with a related list merge field. Which statement is true?',
    options: [
      { correct: true, text: 'The fields come from the related list on the parent object\'s page layout for the current user, and record-level filters aren\'t applied.', why: 'Stated in the Help article.' },
      { correct: false, text: 'You can add any filter, such as "priority is High".', why: 'Record-level filters aren\'t applied. Use a flow or Apex for filtering.' },
      { correct: false, text: 'It always includes every field on the related object.', why: 'Only the fields on the layout\'s related list.' },
      { correct: false, text: 'It sends the data even if the user has no Read access to the related object.', why: 'Without the related list on their layout or Read permission, no related list data is sent.' }
    ],
    explanation: 'Related list data is rendered as JSON and shown in the resolution. Activities related lists aren\'t supported, nor are the User and Organization related lists. Use a flow or Apex when you need filtering or formatting.',
    source: SRC.relatedListHelp
  },

  {
    id: 'PR-013',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'field-gen',
    stem: [
      'An admin created and saved a Field Generation template, but it isn\'t offered in Lightning App Builder. What is the most likely cause?',
      'What must happen before a Field Generation template can be assigned to a field in Lightning App Builder?'
    ],
    options: [
      { correct: true, text: 'The template must be activated, and the page must use Dynamic Forms (a Field Section, or a Record Detail migrated to Dynamic Forms).', why: 'Both are needed for the field\'s AI option.' },
      { correct: false, text: 'The template must be converted to a Flex template.', why: 'Field Generation is the right type.' },
      { correct: false, text: 'The field must be read-only.', why: 'Field Generation needs a writable field.' },
      { correct: false, text: 'The user needs Prompt Template Manager.', why: 'Users running templates need Prompt Template User.' }
    ],
    explanation: 'Save and Activate the template so it shows in Lightning App Builder. Then put the field in a Field Section, or migrate the Record Detail component to Dynamic Forms, and assign the template to the field.',
    source: SRC.fieldGeneration
  },

  {
    id: 'PR-014',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'field-gen',
    stem: 'Which field types can a Field Generation template fill?',
    options: [
      { correct: true, text: 'Writable text, text area, long text area and rich text area fields', why: 'Text-based, writable fields.' },
      { correct: false, text: 'Any field, including formula fields', why: 'Read-only fields such as formulas aren\'t supported.' },
      { correct: false, text: 'Number and currency fields only', why: 'Field Generation fills text fields.' },
      { correct: false, text: 'Picklist fields only', why: 'Field Generation fills text fields.' }
    ],
    explanation: 'Field Generation supports writable text, text area, text area (long) and text area (rich) fields. Read-only fields aren\'t supported.',
    source: SRC.fieldGeneration
  },

  {
    id: 'PR-015',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'template-type',
    stem: 'How many inputs can a Flex prompt template define?',
    options: [
      { correct: true, text: 'Up to five', why: 'Flex templates take up to five inputs.' },
      { correct: false, text: 'Exactly one record', why: 'That describes record-based template types.' },
      { correct: false, text: 'Up to twenty', why: 'The limit is five.' },
      { correct: false, text: 'None: Flex templates use only free text', why: 'Inputs can be records or text.' }
    ],
    explanation: 'Flex templates have no predefined inputs. You define up to five, such as Account, Asset and Contact, and reference them with merge fields.',
    source: SRC.fieldGeneration
  },

  {
    id: 'PR-016',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'masking',
    stem: [
      'Which statement about Trust Layer data masking is true?',
      'A compliance team assumes data masking protects every Agentforce feature. What should the Agentforce Specialist tell them?'
    ],
    options: [
      { correct: true, text: 'Data masking for LLMs is currently disabled for agents. It applies to embedded features such as Service Replies and Work Summaries once an admin turns it on.', why: 'Stated in the Trust Layer Trailhead module.' },
      { correct: false, text: 'Masking is always on for every feature and can\'t be turned off.', why: 'An admin turns it on, and it doesn\'t cover agents.' },
      { correct: false, text: 'Masking permanently deletes sensitive values from records.', why: 'It replaces values in the prompt with placeholders. Records aren\'t changed.' },
      { correct: false, text: 'Masking only works on fields marked encrypted with Shield.', why: 'It uses pattern matching and machine learning.' }
    ],
    explanation: 'Masking swaps sensitive values for placeholders before the prompt reaches the LLM. The LLM keeps the context without seeing the data, and values are put back (demasked) in the response.\n\nThe Trailhead module says masking is currently disabled for agents, so check this before relying on it for an agent.',
    source: SRC.trustJourney
  },

  {
    id: 'PR-017',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'trust-journey',
    stem: [
      'What does prompt defense in the Einstein Trust Layer do?',
      'Which Trust Layer feature adds guardrail instructions to help protect against prompt injection?'
    ],
    options: [
      { correct: true, text: 'Adds system guardrail instructions telling the LLM how to behave, such as not answering without a basis in data', why: 'Reduces harmful output and prompt injection.' },
      { correct: false, text: 'Blocks users from writing prompt templates', why: 'Permissions do that.' },
      { correct: false, text: 'Encrypts the prompt in transit', why: 'Not what prompt defense means.' },
      { correct: false, text: 'Scores responses for toxicity', why: 'That is toxicity detection, after the response.' }
    ],
    explanation: 'Prompt defense adds guardrails to the prompt to reduce unintended or harmful output and help protect against prompt injection. It covers Prompt Builder, the Prompt Template Connect API and the Prompt Template invocable action.',
    source: SRC.trustJourney
  },

  {
    id: 'PR-018',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'trust-journey',
    stem: 'A user without access to the Salary field runs a prompt template that merges in that field. What happens?',
    options: [
      { correct: true, text: 'Secure data retrieval respects the user\'s permissions, so the field isn\'t included.', why: 'Grounding uses the running user\'s object and field access.' },
      { correct: false, text: 'The field is included but masked.', why: 'Data the user can\'t see isn\'t retrieved at all.' },
      { correct: false, text: 'The template runs in system mode and includes it.', why: 'Grounding respects existing permissions.' },
      { correct: false, text: 'The template fails and can\'t be activated.', why: 'It runs, without the inaccessible data.' }
    ],
    explanation: 'Secure data retrieval pulls org data while respecting existing permissions on objects and fields. Data that needs escalated permissions is left out.',
    source: SRC.trustJourney
  },

  {
    id: 'PR-019',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'trust-journey',
    stem: 'Put these Trust Layer steps for an outgoing prompt in the right order. Which order is correct?',
    options: [
      { correct: true, text: 'Secure data retrieval, dynamic grounding, data masking, prompt defense, then the LLM gateway', why: 'The order in the prompt journey.' },
      { correct: false, text: 'Data masking, secure data retrieval, prompt defense, dynamic grounding, then the LLM gateway', why: 'Data must be retrieved before it can be masked.' },
      { correct: false, text: 'LLM gateway, dynamic grounding, data masking, then toxicity scoring', why: 'The gateway comes last on the way out.' },
      { correct: false, text: 'Toxicity scoring, data masking, dynamic grounding, then prompt defense', why: 'Toxicity scoring checks the response on the way back.' }
    ],
    explanation: 'Outgoing: the template is filled with permission-aware data (secure data retrieval and dynamic grounding), sensitive values are masked, prompt defense adds guardrails, and the prompt passes through the secure gateway to the LLM, which retains nothing.\n\nOn the way back the response is scored for toxicity, demasked and logged in the audit trail.',
    source: SRC.trustJourney
  },

  {
    id: 'PR-020',
    section: 'prompt',
    objective: 'Explain how to manage and prevent specific models from being accessed',
    stem: 'A company\'s policy forbids sending prompts to models hosted by one particular AI provider. How can an admin block them?',
    options: [
      { correct: true, text: 'Turn off that model provider in the Einstein generative AI settings, which blocks access to its models', why: 'The settings have a switch per provider, such as OpenAI, Azure OpenAI, AWS Bedrock and Vertex AI.' },
      { correct: false, text: 'Add an instruction to every template saying not to use that provider', why: 'Templates don\'t choose providers through instructions.' },
      { correct: false, text: 'Remove Prompt Template User from all users', why: 'Blocks every template, not one provider.' },
      { correct: false, text: 'Turn on data masking', why: 'Masks data. It doesn\'t block a provider.' }
    ],
    explanation: 'In Setup, open Einstein Setup and go to Configure Model Providers. Turn off a provider to block its models in agents, prompt templates, APIs and other generative AI features. It can take up to 10 minutes to take effect.\n\nThe same switches exist in the EinsteinGptSettings metadata type, for example for AWS Bedrock, Azure OpenAI, OpenAI and Vertex AI.',
    source: SRC.modelProviders
  },

  {
    id: 'PR-024',
    section: 'prompt',
    objective: 'Explain how to manage and prevent specific models from being accessed',
    stem: 'An admin turns off a model provider in Einstein Setup. What should they expect?',
    options: [
      { correct: true, text: 'Agents, prompt templates and other features using that provider\'s models can stop working, and the change can take up to 10 minutes.', why: 'Help warns about both.' },
      { correct: false, text: 'Templates automatically switch to another provider\'s model.', why: 'Affected components stop running. Test in a sandbox first.' },
      { correct: false, text: 'Only new templates are affected. Existing ones keep using the provider.', why: 'Access is blocked for every feature.' },
      { correct: false, text: 'Nothing changes until the next Salesforce release.', why: 'It takes effect within about 10 minutes.' }
    ],
    explanation: 'Turning off a provider can stop agents, agent actions, Testing Center, prompt templates, APIs, and features such as Service Replies and Sales Summaries. Help recommends testing in a sandbox before making the change in production.',
    source: SRC.modelProviders
  },

  {
    id: 'PR-025',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'template-type-list',
    stem: [
      'Which prompt template type is used by the Summarize Record standard action?',
      'An agent uses the Summarize Record action. Which template type can be customised to change its output?'
    ],
    options: [
      { correct: true, text: 'Record Summary', why: 'Record Summary templates power Summarize Record.' },
      { correct: false, text: 'Field Generation', why: 'Fills a field on a record page.' },
      { correct: false, text: 'Sales Emails', why: 'Drafts personalised emails.' },
      { correct: false, text: 'Work Summary', why: 'Drafts wrap-up summaries for voice calls and messaging sessions.' }
    ],
    explanation: 'Record Summary templates summarise record data. The Summarize Record invocable action and the Summarize Record agent action both use them.',
    source: SRC.templateTypes
  },

  {
    id: 'PR-026',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'template-type-list',
    stem: [
      'Which prompt template type lets you customise how Agentforce agents answer questions from knowledge?',
      'A team wants to change the tone and format of answers given by the Answer Questions with Knowledge action. Which template type should they customise?'
    ],
    options: [
      { correct: true, text: 'Knowledge Answers', why: 'Customises how agents answer questions.' },
      { correct: false, text: 'Flex', why: 'For needs other types don\'t cover.' },
      { correct: false, text: 'Case Summary', why: 'Summarises a case.' },
      { correct: false, text: 'Record Research', why: 'Researches records using web search.' }
    ],
    explanation: 'Knowledge Answers templates sit behind Answer Questions with Knowledge. Other types include Field Generation, Flex, Sales Emails, Record Summary, Work Summary, Case Summary and Record Research, which uses the Einstein Search Web Retriever.',
    source: SRC.templateTypes
  },

  {
    id: 'PR-027',
    section: 'prompt',
    objective: 'Considerations for prompt template types such as field generation and flex',
    group: 'template-type-list',
    stem: 'Which prompt template type drafts a Summary, Issue and Resolution in the Wrap Up component at the end of a voice call or messaging session?',
    options: [
      { correct: true, text: 'Work Summary', why: 'Built for the end-of-conversation wrap-up.' },
      { correct: false, text: 'Record Summary', why: 'Summarises a record for agents and invocable actions.' },
      { correct: false, text: 'Grounded Service Replies', why: 'Suggests replies during Live Chat and Messaging Sessions.' },
      { correct: false, text: 'Field Generation', why: 'Fills a field when a user clicks a button.' }
    ],
    explanation: 'Work Summary templates draft wrap-up notes for voice calls and messaging sessions. Service Replies templates (contextual and grounded) suggest replies during the conversation.',
    source: SRC.templateTypes
  },

  {
    id: 'PR-028',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    group: 'versions',
    stem: [
      'An admin tries to edit a prompt template version that was active last month but has since been deactivated. What happens?',
      'Which statement about activated prompt template versions is true?'
    ],
    options: [
      { correct: true, text: 'Any version that was ever active is immutable. Save it as a new version to make changes.', why: 'Activation makes a version permanent.' },
      { correct: false, text: 'Deactivating a version unlocks it for editing.', why: 'It stays immutable even after deactivation.' },
      { correct: false, text: 'Only the Prompt Template User can edit it.', why: 'Nobody can edit it.' },
      { correct: false, text: 'Edits are allowed but don\'t save until the next release.', why: 'It can\'t be edited at all.' }
    ],
    explanation: 'The first save creates Version 1. Use Save As > Save as a New Version for more versions. A new version isn\'t available to users until it is activated.\n\nSave As > Save as a New Template creates a separate template, but that option isn\'t supported for Flex templates.',
    source: SRC.templateVersions
  },

  {
    id: 'PR-029',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    group: 'versions',
    stem: 'Two versions of a prompt template use different LLMs. Version 1 is active and Version 2 is the latest draft. Which model generates responses for users?',
    options: [
      { correct: true, text: 'Version 1\'s model, because only the active version\'s model configuration is used', why: 'Each version can have its own model.' },
      { correct: false, text: 'Version 2\'s model, because the latest version always wins', why: 'Only the active version runs.' },
      { correct: false, text: 'Both, alternating between users', why: 'Only one version is active.' },
      { correct: false, text: 'The org\'s default model, ignoring both versions', why: 'The active version\'s model is used.' }
    ],
    explanation: 'Each version of a template can have a different model configuration. Only the configuration in the activated version is used.',
    source: SRC.llmConfigs
  },

  {
    id: 'PR-030',
    section: 'prompt',
    objective: 'Explain how to manage and prevent specific models from being accessed',
    stem: [
      'An admin changes a setting on a standard LLM configuration in Prompt Builder. How is the changed configuration saved?',
      'What is the difference between standard and custom LLM configurations in Prompt Builder?'
    ],
    options: [
      { correct: true, text: 'Standard ones come with Prompt Builder. Custom ones come from BYO-LLM, and a modified standard configuration is saved as a custom one.', why: 'Both statements are from Help.' },
      { correct: false, text: 'Standard configurations can be edited in place for every template.', why: 'A modified standard configuration becomes custom.' },
      { correct: false, text: 'Custom configurations are only available in Developer Edition.', why: 'Not a restriction.' },
      { correct: false, text: 'There is no difference.', why: 'They come from different places.' }
    ],
    explanation: 'Models are managed in AI Models (formerly Einstein Studio). The View this model link in Template Settings needs Data Cloud Admin permissions.',
    source: SRC.llmConfigs
  },

  {
    id: 'PR-031',
    section: 'prompt',
    objective: 'Explain how to manage and prevent specific models from being accessed',
    stem: 'A model used by an active prompt template is hidden in AI Models. What happens?',
    options: [
      { correct: true, text: 'The template keeps running, but you must pick an available model before saving a new version.', why: 'Hidden models keep working. Replacing them is recommended.' },
      { correct: false, text: 'The template stops at once.', why: 'It continues to run as before.' },
      { correct: false, text: 'The template switches to a random model.', why: 'Nothing switches automatically.' },
      { correct: false, text: 'The template is deleted.', why: 'Hiding a model doesn\'t delete templates.' }
    ],
    explanation: 'Help recommends replacing a hidden model with an available one. If you open a template whose model is unavailable, Prompt Builder makes you choose a different model before saving changes as a new version.',
    source: SRC.llmConfigs
  },

  {
    id: 'PR-032',
    section: 'prompt',
    objective: 'Best practices for writing effective prompts',
    group: 'prompt-practice',
    stem: [
      'How does Salesforce suggest helping the LLM tell the difference between context and instructions in a prompt template?',
      'Which practice from Salesforce\'s prompt template guidance separates instructions from context?'
    ],
    options: [
      { correct: true, text: 'Add a line "Instructions:" and put the instructions inside triple quotes (""")', why: 'Salesforce\'s recommended layout.' },
      { correct: false, text: 'Put the instructions in capital letters', why: 'Not the recommended method.' },
      { correct: false, text: 'Put instructions in a separate template', why: 'They belong in the same template, clearly marked.' },
      { correct: false, text: 'Leave instructions out and rely on the grounding data', why: 'The LLM needs clear instructions.' }
    ],
    explanation: 'Salesforce\'s best practices: keep templates concise in natural language, give the LLM a role and a goal, keep one consistent style, mark instructions clearly, tell it to generate only the content wanted, and iterate with user feedback.',
    source: SRC.promptBestPractices
  },

  {
    id: 'PR-033',
    section: 'prompt',
    objective: 'Best practices for writing effective prompts',
    group: 'prompt-practice',
    stem: 'An email template sometimes returns a paragraph describing how it wrote the email, followed by the email. What should be added?',
    options: [
      { correct: true, text: 'An instruction such as "Follow these instructions strictly to generate only the message to be sent to the customer."', why: 'Tells the LLM to return only the content.' },
      { correct: false, text: 'More merge fields', why: 'Doesn\'t stop the commentary.' },
      { correct: false, text: 'A higher token limit', why: 'Gives room for more commentary.' },
      { correct: false, text: 'Emojis to set the tone', why: 'Style doesn\'t fix this.' }
    ],
    explanation: 'Direct instructions to generate only the expected content stop the LLM describing its process. Starting from the Example Prompt Template Library helps too.',
    source: SRC.promptBestPractices
  },

  {
    id: 'PR-034',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'masking',
    stem: [
      'What is the difference between pattern-based and field-based data masking?',
      'Which statement about field-based data masking is true?'
    ],
    options: [
      { correct: true, text: 'Field-based masking uses Data Classification tags on fields and applies only to merge fields. Pattern-based masking scans all prompt text.', why: 'The two approaches as described in Help.' },
      { correct: false, text: 'Field-based masking scans free text typed by users.', why: 'It applies only to merge fields from record fields and related lists.' },
      { correct: false, text: 'Pattern-based masking needs every field classified first.', why: 'It detects values automatically.' },
      { correct: false, text: 'They are two names for the same feature.', why: 'They work differently.' }
    ],
    explanation: 'Field-based masking works on record fields and related lists in prompt templates, based on the Data Classification you set. Pattern-based masking evaluates the whole prompt. Using both gives wider coverage.',
    source: SRC.maskConsiderations
  },

  {
    id: 'PR-035',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'masking',
    stem: 'A company needs the most reliable masking of customer names in its prompt templates. What does Salesforce recommend?',
    options: [
      { correct: true, text: 'Field-based masking on classified fields, because pattern-based detection can miss unusual names', why: 'Field-based is the more reliable option.' },
      { correct: false, text: 'Pattern-based masking only, because it never misses a value', why: 'No model is 100% accurate. Missed values go to the LLM unmasked.' },
      { correct: false, text: 'Masking for agents', why: 'Masking is disabled for agents.' },
      { correct: false, text: 'Toxicity detection', why: 'Detects harmful content, not names.' }
    ],
    explanation: 'Pattern-based masking relies on model inference. Unusual or non-English names aren\'t always detected, and anything missed is sent to the LLM unmasked. Test with realistic data and use the audit trail to check masking.',
    source: SRC.maskConsiderations
  },

  {
    id: 'PR-036',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    stem: 'Which two are types of attack that Salesforce Prompt Injection Detection recognises?',
    options: [
      { correct: true, text: 'Privilege escalation, such as "Do Anything Now" jailbreaks', why: 'Attempts to change or bypass system rules.' },
      { correct: true, text: 'Prompt leakage, trying to extract system policies or knowledge documents', why: 'Attempts to gather sensitive information.' },
      { correct: false, text: 'Slow network connections', why: 'Not an attack type.' },
      { correct: false, text: 'Spelling mistakes in the prompt', why: 'Not an attack type.' },
      { correct: false, text: 'Long prompts over the token limit', why: 'A limit, not an attack.' }
    ],
    explanation: 'Recognised types: pretending (role-play), privilege escalation, prompt leakage, encoding attacks, privacy attacks and malicious code generation. Injections can come directly in the prompt or indirectly through grounding data.\n\nDetected attempts are scored and logged in the audit trail in Data 360. The feature is in beta.',
    source: SRC.promptInjection
  },

  {
    id: 'PR-037',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'toxicity',
    stem: [
      'Which statement about toxicity detection in the Einstein Trust Layer is true?',
      'An admin wants toxicity checks on prompts as well as responses. What do they need to know?'
    ],
    options: [
      { correct: true, text: 'Detection on responses is always on. Detection on prompts is a beta that is off by default and can be turned on.', why: 'Responses are always checked. Prompts are opt-in.' },
      { correct: false, text: 'Both are off by default.', why: 'Response detection is always on.' },
      { correct: false, text: 'Response detection can be turned off to save credits.', why: 'It can\'t be changed.' },
      { correct: false, text: 'Toxicity is only checked in Slack.', why: 'It applies across AI features.' }
    ],
    explanation: 'Toxic content in prompts can come from untrusted sources such as public chat or web content. Scores run from 0 to 1, with 1 the most toxic. There is an overall score and a score per category, logged in the audit trail and stored in Data 360.',
    source: SRC.toxicity
  },

  {
    id: 'PR-038',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'toxicity',
    stem: 'Which three are categories recognised by Einstein toxicity detection?',
    options: [
      { correct: true, text: 'Violence', why: 'A toxicity category.' },
      { correct: true, text: 'Hate', why: 'A toxicity category.' },
      { correct: true, text: 'Profanity', why: 'A toxicity category.' },
      { correct: false, text: 'Sarcasm', why: 'Not a listed category.' },
      { correct: false, text: 'Off-topic', why: 'Not a toxicity category.' },
      { correct: false, text: 'Spam', why: 'Not a listed category.' }
    ],
    explanation: 'The five categories are violence, sexual, profanity, hate and physical (substances, self-harm and similar). Each is scored, plus an overall score.',
    source: SRC.toxicity
  },

  {
    id: 'PR-039',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    group: 'related-list-help',
    stem: 'A template is grounded on Account related lists. Which two statements are true?',
    options: [
      { correct: true, text: 'Activities related lists aren\'t supported.', why: 'Stated limitation.' },
      { correct: true, text: 'Only Salesforce Files in a related list are used. Classic Attachments aren\'t.', why: 'Convert attachments to Files first.' },
      { correct: false, text: 'Every related list on the object is available, even if not on the layout.', why: 'Only related lists on the page layout.' },
      { correct: false, text: 'A related list with zero records makes the template fail.', why: 'The prompt still runs, without that content.' },
      { correct: false, text: 'Record-level filters can be applied to each related list.', why: 'They aren\'t applied.' }
    ],
    explanation: 'Related lists come from the page layout. With custom record types, only related lists on the master record type\'s layout are available. The User and Organization related lists aren\'t supported.',
    source: SRC.relatedListHelp
  },

  {
    id: 'PR-040',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    stem: [
      'An admin wants to ground a template with everything on the user\'s Account page layout in one click, without choosing fields one by one. Which option fits?',
      'What does a Record Snapshot add to a prompt template?'
    ],
    options: [
      { correct: true, text: 'A Record Snapshot, which includes the data on the user\'s page layout as one resource', why: 'One resource for the whole layout.' },
      { correct: false, text: 'A Field Generation template', why: 'A template type, not a grounding resource.' },
      { correct: false, text: 'A retriever', why: 'Searches indexed content in Data 360.' },
      { correct: false, text: 'A Data Library', why: 'Holds unstructured content such as files.' }
    ],
    explanation: 'Record Snapshots use the page layout, not Dynamic Forms. They take the first 6 related lists with up to 5 records each, the next 5 tasks and events, and the 5 most recent emails. Empty values are filtered out.',
    source: SRC.recordSnapshots
  },

  {
    id: 'PR-041',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    group: 'retriever-settings',
    stem: [
      'An admin adds a retriever to a prompt template. What can the retriever\'s search text use?',
      'Which statement about a retriever\'s search text in a prompt template is true?'
    ],
    options: [
      { correct: true, text: 'Free text, globals and prompt inputs, up to 255 characters', why: 'Not related lists, flows or Apex.' },
      { correct: false, text: 'Any flow or Apex merge field', why: 'Those sources aren\'t allowed in search text.' },
      { correct: false, text: 'Related list merge fields only', why: 'Not allowed in search text.' },
      { correct: false, text: 'Unlimited text from the whole record', why: 'Limited to 255 characters.' }
    ],
    explanation: 'In Template Settings you can tune the search text, the output fields returned and the number of results. If you leave output fields or number of results empty, the values from the retriever\'s own configuration are used. Data 360 permission sets control access to retrievers.',
    source: SRC.retrieversInTemplates
  },

  {
    id: 'PR-042',
    section: 'prompt',
    objective: 'Identify the appropriate grounding technique',
    group: 'retriever-settings',
    stem: 'Which three kinds of retriever can be added to a prompt template?',
    options: [
      { correct: true, text: 'Individual retrievers created in AI Models', why: 'Supported.' },
      { correct: true, text: 'Ensemble retrievers created in AI Models', why: 'Supported.' },
      { correct: true, text: 'Web retrievers created in Agentforce Data Library', why: 'Supported.' },
      { correct: false, text: 'Report retrievers created in Reports', why: 'Not a retriever type.' },
      { correct: false, text: 'Apex retrievers created in the Developer Console', why: 'Not a retriever type.' },
      { correct: false, text: 'Flow retrievers created in Flow Builder', why: 'Not a retriever type.' }
    ],
    explanation: 'Retrievers search knowledge indexed in Data 360 and return relevant chunks, shown as JSON in the preview resolution. Older default individual retrievers still work, but new default ones are no longer created when an index is built.',
    source: SRC.retrieversInTemplates
  },

  {
    id: 'PR-021',
    section: 'prompt',
    objective: 'Given business requirements, identify when to use Prompt Builder',
    group: 'when-prompt-builder',
    stem: [
      'Which requirement is best met with Prompt Builder rather than an agent?',
      'A sales team wants a button that drafts a consistent account summary into a field. Which tool fits best?'
    ],
    options: [
      { correct: true, text: 'Generate the same kind of grounded text in one place, such as a field, an email draft or a flow step', why: 'Prompt Builder makes reusable, grounded single-shot generation.' },
      { correct: false, text: 'Hold a multi-turn conversation that books appointments', why: 'Conversations with actions need an agent.' },
      { correct: false, text: 'Route customers across chat and voice and escalate to humans', why: 'That is agent and Omni-Channel work.' },
      { correct: false, text: 'Decide which of 20 actions to run based on what a customer says', why: 'Choosing actions is agent reasoning.' }
    ],
    explanation: 'Prompt Builder creates reusable templates that generate grounded text for a specific job, such as a sales email, field value or record summary. Agents hold conversations, reason about which actions to run and can use prompt templates as actions.',
    source: SRC.promptBuilder
  },

  {
    id: 'PR-022',
    section: 'prompt',
    objective: 'Best practices for writing effective prompts',
    group: 'prompt-practice',
    stem: [
      'A sales email template produces long, rambling emails. What is the best change?',
      'Generated emails vary wildly in length. Which change to the template helps most?'
    ],
    options: [
      { correct: true, text: 'State a clear limit and structure, such as "no more than 70 words, with an invitation to talk".', why: 'Specific instructions give consistent output.' },
      { correct: false, text: 'Add more merge fields so the LLM has more to say.', why: 'More data tends to make output longer.' },
      { correct: false, text: 'Ask the LLM to "be creative".', why: 'Makes output less predictable.' },
      { correct: false, text: 'Switch to a Field Generation template.', why: 'The template type isn\'t the problem.' }
    ],
    explanation: 'A specific prompt is a grounded prompt. Name the sender, the recipient and the purpose, and set the length and structure you want. Then preview with real records before activating.',
    source: SRC.groundTemplates
  },

  {
    id: 'PR-023',
    section: 'prompt',
    objective: 'Identify the security and privacy features of the Trust Layer',
    group: 'masking',
    stem: 'How does Trust Layer data masking find sensitive values such as names and credit card numbers?',
    options: [
      { correct: true, text: 'Pattern matching combined with machine learning', why: 'This is how pattern-based masking works.' },
      { correct: false, text: 'Only fields listed in a custom metadata type', why: 'It also detects values by pattern.' },
      { correct: false, text: 'The LLM decides which values to hide', why: 'Masking happens before the LLM sees the prompt.' },
      { correct: false, text: 'Only fields marked "Sensitive" in Data 360', why: 'Not how pattern-based masking works.' }
    ],
    explanation: 'Masking replaces detected values with tokenised placeholders, so the LLM keeps the context without seeing the real data. The values are restored in the response.',
    source: SRC.trustJourney
  },

  {
    id: 'PR-043',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    group: 'runtime',
    stem: [
      'At run time, which step happens after the LLM returns its response?',
      'A prompt template is invoked from a flow. Which step comes last before the response is returned to the flow?'
    ],
    options: [
      { correct: true, text: 'The response is logged for audit, toxicity detection runs, masked values are demasked, then it is returned', why: 'The return journey.' },
      { correct: false, text: 'Merge fields are resolved', why: 'That happens before the LLM is called.' },
      { correct: false, text: 'Data masking is applied', why: 'Masking happens on the way out.' },
      { correct: false, text: 'Prompt defense is added', why: 'Added before the prompt reaches the LLM.' }
    ],
    explanation: 'Run-time steps: invoke with input, resolve the prompt (secure data retrieval and grounding), apply Trust Layer masking and prompt defense, send through the LLM gateway, log the response, apply toxicity detection and demasking, and return the response raw or structured.\n\nPrompt resolution is also called "hydration" or "prompt grounding".',
    source: SRC.templateRuntime
  },

  {
    id: 'PR-044',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    group: 'runtime',
    stem: 'A prompt template is run by an agent, a flow or Apex. Whose permissions govern access to the merge field data?',
    options: [
      { correct: true, text: 'The executing user\'s permissions', why: 'Secure data retrieval follows the running user.' },
      { correct: false, text: 'The template author\'s permissions', why: 'Authors don\'t lend their access.' },
      { correct: false, text: 'System administrator permissions, always', why: 'Grounding isn\'t system mode by default.' },
      { correct: false, text: 'The LLM provider\'s permissions', why: 'Providers don\'t hold Salesforce permissions.' }
    ],
    explanation: 'For a service agent, the executing user is usually the agent user. Dynamic grounding can also pull Data 360 content through retrievers, flows and SOQL.',
    source: SRC.templateRuntime
  },

  {
    id: 'PR-045',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    group: 'runtime',
    stem: 'How can an admin see the full run-time behaviour of a prompt template before activating it?',
    options: [
      { correct: true, text: 'Use Prompt Builder\'s preview: give sample input, check the resolved prompt, then the generated response', why: 'Preview simulates the complete run.' },
      { correct: false, text: 'Activate it in production and watch users', why: 'Preview first.' },
      { correct: false, text: 'Read the template\'s metadata XML', why: 'Doesn\'t show the resolved prompt or response.' },
      { correct: false, text: 'It can\'t be previewed', why: 'Preview is built in.' }
    ],
    explanation: 'The resolution shows exactly what will be sent to the LLM, including data from merge fields, related lists (as JSON) and retrievers. That makes grounding problems easy to spot.',
    source: SRC.templateRuntime
  },

  {
    id: 'PR-046',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    group: 'template-limits',
    stem: [
      'Which is a documented Prompt Builder limit?',
      'An admin wants to ground one template with eight different Apex classes. What will stop them?'
    ],
    options: [
      { correct: true, text: 'A maximum of 5 Apex merge fields per template (also 5 flow and 5 related list merge fields)', why: 'Stated limits.' },
      { correct: false, text: 'A maximum of 1 Apex merge field per template', why: 'The limit is 5.' },
      { correct: false, text: 'Unlimited merge fields of every kind', why: 'There are limits.' },
      { correct: false, text: 'A maximum of 500 versions per template', why: 'The limit is 50.' }
    ],
    explanation: 'Limits: 128,000 characters per template, 50 versions, 50 merge fields, 5 flow, 5 Apex and 5 related list merge fields, and 5 inputs for a Flex template.',
    source: SRC.templateLimits
  },

  {
    id: 'PR-047',
    section: 'prompt',
    objective: 'Explain creating, activating and executing prompt templates',
    group: 'template-limits',
    stem: 'A user attaches 12 files totalling 20 MB to a prompt request. What happens?',
    options: [
      { correct: true, text: 'Files over the limits (10 files, 15 MB per request) are excluded, and the Resolution panel lists them', why: 'Limits apply across all models.' },
      { correct: false, text: 'The request fails completely', why: 'Excess files are excluded.' },
      { correct: false, text: 'All files are sent, as there are no file limits', why: 'There are limits.' },
      { correct: false, text: 'Files are compressed automatically to fit', why: 'They are excluded, not compressed.' }
    ],
    explanation: 'Files that convert to PDF count towards the 15 MB after conversion. Some models have lower per-type limits, shown in the model\'s details.',
    source: SRC.templateLimits
  },

  {
    id: 'PR-048',
    section: 'prompt',
    objective: 'Best practices for writing effective prompts',
    group: 'conditional',
    stem: [
      'A team has five nearly identical case reply templates, one per priority and customer tier. What can replace them?',
      'What does conditional logic in the Prompt Builder Block Editor let you do?'
    ],
    options: [
      { correct: true, text: 'One template with if, else if and else blocks that include different text based on merge field values', why: 'Adapts the prompt to context.' },
      { correct: false, text: 'Run different LLMs for each condition', why: 'Conditions control prompt text, not models.' },
      { correct: false, text: 'Loop through every related record in a list', why: 'Conditional blocks don\'t iterate collections.' },
      { correct: false, text: 'Make the LLM choose which instructions to follow', why: 'The condition is evaluated before the prompt is sent.' }
    ],
    explanation: 'When a condition is true, its text is included in the prompt. Operators: `==`, `!=`, `>`, `<`, `>=`, `<=`, `and`, `or`, `not` and `in`. Blocks can be nested, for example priority High and then tier Premium.',
    source: SRC.conditionalLogic
  },

  {
    id: 'PR-049',
    section: 'prompt',
    objective: 'Best practices for writing effective prompts',
    group: 'conditional',
    stem: 'A conditional block is meant to check each of the files related to a case. Why doesn\'t it work?',
    options: [
      { correct: true, text: 'Conditional blocks evaluate a single related record and don\'t iterate over a collection', why: 'Stated limitation.' },
      { correct: false, text: 'Files can\'t be used in prompt templates', why: 'File inputs are supported.' },
      { correct: false, text: 'Conditions only work with Flex templates', why: 'Not the reason.' },
      { correct: false, text: 'The `in` operator isn\'t supported', why: 'It is supported.' }
    ],
    explanation: 'To loop through records, use a flow or Apex as the grounding resource and pass the prepared text to the template.',
    source: SRC.conditionalLogic
  },

  // ---------------- Data 360 Fundamentals (20%) ----------------

  {
    id: 'DA-001',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-pieces',
    stem: [
      'In Data 360, what is chunking?',
      'Before unstructured content can be searched for grounding, it is chunked. What does that mean?'
    ],
    options: [
      { correct: true, text: 'Splitting data into smaller units that keep their original meaning and context.', why: 'Smaller pieces can be matched to a question precisely.' },
      { correct: false, text: 'Compressing files so they take less storage.', why: 'Chunking is about search, not storage.' },
      { correct: false, text: 'Grouping records by owner for sharing.', why: 'Unrelated to sharing.' },
      { correct: false, text: 'Removing personal data before indexing.', why: 'That is masking, a Trust Layer job.' }
    ],
    explanation: 'Chunking happens during indexing. Each chunk is then turned into a vector and stored in the search index. A retriever later finds the chunks most relevant to the question.',
    source: SRC.dataLibrary
  },

  {
    id: 'DA-002',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-pieces',
    stem: 'What does a retriever do?',
    options: [
      { correct: true, text: 'Queries a search index at run time and returns the most relevant chunks for the prompt.', why: 'It is the "retrieval" in retrieval-augmented generation.' },
      { correct: false, text: 'Builds the search index from raw files.', why: 'Indexing builds the index. The retriever queries it.' },
      { correct: false, text: 'Retrieves deleted records from the Recycle Bin.', why: 'Unrelated.' },
      { correct: false, text: 'Chooses which LLM answers the question.', why: 'Model choice is set elsewhere.' }
    ],
    explanation: 'A retriever is configured with a search index, optional filters and the fields to return. Each save creates a new version, and only one version is active at a time.',
    source: SRC.retriever
  },

  {
    id: 'DA-003',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    stem: 'A company wants its service agent to answer questions from 200 PDF product manuals. What is the quickest way to ground the agent in them?',
    options: [
      { correct: true, text: 'Create an Agentforce Data Library and upload the files.', why: 'The library sets up the indexing and a retriever for you.' },
      { correct: false, text: 'Paste the manuals into the subagent instructions.', why: 'Far too much text, and every turn would pay for it.' },
      { correct: false, text: 'Attach the PDFs to each Case record.', why: 'The agent wouldn\'t search them as a knowledge source.' },
      { correct: false, text: 'Build a Field Generation template for each manual.', why: 'Templates don\'t index documents.' }
    ],
    explanation: 'An Agentforce Data Library takes files or knowledge articles and creates the Data 360 pieces for you: a data model object (with an ADL prefix), a search index and a retriever.\n\nThe agent then uses the library to answer from the content.',
    source: SRC.dataLibrary
  },

  {
    id: 'DA-004',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    stem: 'One search index holds product documents for every region. The UK agent should only use UK documents. What is the simplest approach?',
    options: [
      { correct: true, text: 'Add a filter on region to the retriever the UK agent uses.', why: 'Retrievers support filters on the indexed fields.' },
      { correct: false, text: 'Tell the LLM in the instructions to ignore non-UK documents.', why: 'The other regions\' text still reaches the prompt.' },
      { correct: false, text: 'Delete the non-UK documents from Data 360.', why: 'Breaks every other region.' },
      { correct: false, text: 'Turn on data masking for the region field.', why: 'Masking hides values. It doesn\'t filter results.' }
    ],
    explanation: 'A retriever\'s configuration is its search index, its filters and the fields it returns. Several retrievers can point at the same index with different filters.',
    source: SRC.retriever
  },

  {
    id: 'DA-005',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    stem: 'An admin saves changes to a retriever three times. How many versions exist and how many are active?',
    options: [
      { correct: true, text: 'Several versions, but only one is active at a time.', why: 'Each save creates a version. One is active.' },
      { correct: false, text: 'One version, overwritten on each save.', why: 'Each save creates a new version.' },
      { correct: false, text: 'Three versions, all active and queried in turn.', why: 'Only one version is active.' },
      { correct: false, text: 'No versions until the retriever is deployed to production.', why: 'Versions exist in the org where you build.' }
    ],
    explanation: 'Retrievers are versioned like prompt templates. You can test a new version and switch which one is active.',
    source: SRC.retriever
  },

  {
    id: 'DA-006',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    stem: 'Customers ask natural-language questions, and also search for exact part numbers such as "XJ-4021". Which search index type suits this?',
    options: [
      { correct: true, text: 'Hybrid search, combining vector and keyword search', why: 'Vector finds meaning. Keyword finds exact codes.' },
      { correct: false, text: 'Vector search only', why: 'Weak at exact codes with no semantic meaning.' },
      { correct: false, text: 'Keyword search only', why: 'Misses questions worded differently from the text.' },
      { correct: false, text: 'A related list merge field', why: 'That is a prompt grounding option, not a search index.' }
    ],
    explanation: 'Vector search matches meaning, so "my parcel is late" can find "delayed delivery". Keyword search matches exact terms. Hybrid search uses both, which suits content with product codes or Ids.',
    source: SRC.searchIndexTypes
  },

  {
    id: 'DA-007',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'data-library',
    stem: 'Which two can be used as sources for an Agentforce Data Library?',
    options: [
      { correct: true, text: 'Knowledge articles', why: 'A common Data Library source.' },
      { correct: true, text: 'Uploaded files such as PDFs', why: 'Files can be uploaded to the library.' },
      { correct: false, text: 'Dashboards', why: 'Not a Data Library source.' },
      { correct: false, text: 'Apex debug logs', why: 'Not a Data Library source.' },
      { correct: false, text: 'Permission sets', why: 'Not content to ground on.' }
    ],
    explanation: 'A new Data Library can use knowledge articles, uploaded files or a custom retriever. Web search libraries can\'t be created any more. Existing ones are read-only.\n\nEach library has one source, fixed once chosen.',
    source: SRC.librarySource
  },

  {
    id: 'DA-008',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'data-library',
    stem: [
      'What does Agentforce Data Library set up for you when you add a source?',
      'An admin creates an Agentforce Data Library. Which Data 360 pieces does it create without the admin building them by hand?'
    ],
    options: [
      { correct: true, text: 'A data stream, the data model objects and mapping, the chunking, a search index and a retriever', why: 'The library automates the whole chain.' },
      { correct: false, text: 'Only a search index. The retriever is built by hand.', why: 'The retriever is created once the index is ready.' },
      { correct: false, text: 'A new agent with a knowledge subagent', why: 'The library grounds agents. It doesn\'t create one.' },
      { correct: false, text: 'A copy of the files at the LLM provider', why: 'Content stays in Data 360. Only retrieved chunks go into prompts.' }
    ],
    explanation: 'Setup pushes the data into Data 360, maps it to data model objects, chunks it, builds the search index and then creates a retriever. Chunking time depends on how many sources there are, their size and the fields selected.',
    source: SRC.dataLibrary
  },

  {
    id: 'DA-009',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'data-library',
    stem: 'Two Agentforce Data Libraries use the same knowledge content. Which statement is true?',
    options: [
      { correct: true, text: 'Each library has its own retriever, and both retrievers can point at the same search index.', why: 'Retrievers are per library. Indexes can be shared.' },
      { correct: false, text: 'The second library overwrites the first library\'s retriever.', why: 'Each library keeps its own retriever.' },
      { correct: false, text: 'Two libraries can\'t use the same content.', why: 'They can.' },
      { correct: false, text: 'The libraries share one retriever, so filters on it apply to both.', why: 'Each library has its own retriever.' }
    ],
    explanation: 'Retrievers act as pointers between data and AI features. They decide which Data 360 data a prompt or agent can reach. Each library has its own retriever, which can share a search index with another.',
    source: SRC.dataLibrary
  },

  {
    id: 'DA-010',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'retriever-types',
    stem: [
      'A prompt template must be grounded in knowledge articles and in product manuals, held in two different search indexes. Which retriever type fits?',
      'When should an ensemble retriever be used instead of an individual retriever?'
    ],
    options: [
      { correct: true, text: 'An ensemble retriever, because it grounds on several data sources', why: 'An individual retriever reads one search index only.' },
      { correct: false, text: 'An individual retriever pointed at both indexes', why: 'An individual retriever can fetch from only one search index.' },
      { correct: false, text: 'One search index covering both DMOs', why: 'A search index indexes only one DMO.' },
      { correct: false, text: 'A related list merge field', why: 'Not a retriever. It grounds on related records.' }
    ],
    explanation: 'A search index covers one data model object. An individual retriever reads from one search index. To ground on several sources, use an ensemble retriever. Retrievers are created in AI Models (Einstein Studio).',
    source: SRC.retrieverTypes
  },

  {
    id: 'DA-011',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'index-types',
    stem: [
      'What does an enriched search index add to a vector or hybrid index?',
      'A team wants better retrieval accuracy without curating content by hand and accepts extra cost. Which option fits?'
    ],
    options: [
      { correct: true, text: 'LLM-generated metadata and question chunks alongside the original text, using Flex Credits', why: 'Enriched indexes add metadata and question chunks.' },
      { correct: false, text: 'A keyword index, turning a vector index into a hybrid one', why: 'That is hybrid search, not enrichment.' },
      { correct: false, text: 'Automatic translation of every chunk', why: 'Not what enrichment does.' },
      { correct: false, text: 'Zero data retention for the indexed content', why: 'Zero data retention is a Trust Layer agreement with LLM providers.' }
    ],
    explanation: 'An enriched index generates three chunk types: plain (the original text), metadata (keywords, entities, overviews, summaries) and question (questions the content answers). Generating these with an LLM consumes Flex Credits.\n\nUse it when the accuracy gain is worth the cost.',
    source: SRC.searchIndexTypes
  },

  {
    id: 'DA-012',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'index-types',
    stem: 'How does a hybrid search index produce its results?',
    options: [
      { correct: true, text: 'It runs vector and keyword search, then a fusion ranker merges and ranks the results.', why: 'Two searches, one ranked list.' },
      { correct: false, text: 'It runs keyword search first and only uses vector search if nothing is found.', why: 'Both run together.' },
      { correct: false, text: 'It asks the LLM to rank every document in the index.', why: 'The fusion ranker does the ranking.' },
      { correct: false, text: 'It searches structured fields only.', why: 'It works on chunked text content.' }
    ],
    explanation: 'Hybrid search merges vector results (meaning) and keyword results (exact terms) with a fusion ranker. Results carry hybrid, keyword and vector scores. It suits queries that mix general questions with specific terms.',
    source: SRC.searchIndexTypes
  },

  {
    id: 'DA-013',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-pieces',
    stem: [
      'Why is content chunked before it is indexed for grounding?',
      'What is the main reason Data 360 splits long documents into chunks?'
    ],
    options: [
      { correct: true, text: 'So retrieval returns the specific passages that answer a question, within the LLM\'s token limit', why: 'Whole documents are too long and too broad.' },
      { correct: false, text: 'So documents take less storage in Data 360', why: 'Chunking is about retrieval, not storage.' },
      { correct: false, text: 'So the Trust Layer can mask each chunk', why: 'Masking isn\'t why content is chunked.' },
      { correct: false, text: 'So each chunk can be shared with a different user', why: 'Unrelated to sharing.' }
    ],
    explanation: 'LLMs have a maximum token limit, and searching long, complex documents is slow. Chunks such as paragraphs or sections still make sense on their own, so the retriever can return just the relevant passages.',
    source: SRC.dataLibrary
  },

  {
    id: 'DA-014',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-pieces',
    stem: 'A customer asks a question that a Data Library can answer. What happens first?',
    options: [
      { correct: true, text: 'The question is added to a prompt template that references the retriever.', why: 'The retriever then searches the index.' },
      { correct: false, text: 'The LLM answers, then the retriever checks the answer.', why: 'Retrieval comes before generation.' },
      { correct: false, text: 'The whole library is sent to the LLM.', why: 'Only relevant chunks go into the prompt.' },
      { correct: false, text: 'The content is re-chunked for this question.', why: 'Chunking happens when the index is built.' }
    ],
    explanation: 'Order at run time: the query goes into a prompt template that references the retriever. The retriever searches the index and adds relevant chunks. The LLM generates a response from the enriched prompt. The response is checked against the instructions and returned.\n\nThat is retrieval-augmented generation (RAG).',
    source: SRC.dataLibrary
  },

  {
    id: 'DA-015',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'index-types',
    stem: 'Users mostly ask long, natural-language questions looking for general information, with few product codes. Which index type does Salesforce suggest?',
    options: [
      { correct: true, text: 'Vector search', why: 'Best for long-form, general-information queries.' },
      { correct: false, text: 'Keyword search only', why: 'Misses differently worded matches.' },
      { correct: false, text: 'An enriched index, always', why: 'Only when the accuracy gain justifies the cost.' },
      { correct: false, text: 'No index: send the documents to the LLM', why: 'Too large, and not grounded retrieval.' }
    ],
    explanation: 'Vector search suits general-information queries of more than about five words. Hybrid search adds keyword matching for domain terms and exact codes. Enriched search adds LLM-generated chunks at extra cost.',
    source: SRC.searchIndexTypes
  },

  {
    id: 'DA-016',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'file-library',
    stem: [
      'What are the upload size limits for a file-based Agentforce Data Library?',
      'An admin wants to upload a 60 MB PDF and an 8 MB HTML file to a Data Library. What happens?'
    ],
    options: [
      { correct: true, text: '4 MB for text and HTML files, 100 MB for PDFs. The PDF fits and the HTML file is too big.', why: 'The limits differ by file type.' },
      { correct: false, text: '10 MB for every file type, so neither fits.', why: 'Not the stated limits.' },
      { correct: false, text: 'No limits, because Data 360 scales automatically.', why: 'There are size limits.' },
      { correct: false, text: '100 MB for every file type, so both fit.', why: 'Text and HTML are limited to 4 MB.' }
    ],
    explanation: 'Keep uploads within 4 MB for text and HTML and 100 MB for PDFs. On save, the platform sets up the data streams, data objects, search index and retriever in Data 360.',
    source: SRC.fileLibrary
  },

  {
    id: 'DA-017',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'file-library',
    stem: 'An admin created a Data Library from uploaded files and now wants it to use knowledge articles instead. What should they know?',
    options: [
      { correct: true, text: 'The data source can\'t be changed after it is chosen, so they need a new library.', why: 'Choose the source carefully.' },
      { correct: false, text: 'Edit the library and switch the source type.', why: 'The source can\'t be changed.' },
      { correct: false, text: 'Libraries can only ever use files.', why: 'Knowledge articles are also a source.' },
      { correct: false, text: 'Delete the search index and the library switches over automatically.', why: 'The source stays the same.' }
    ],
    explanation: 'A new library starts with a name and description, then a choice of source: knowledge articles or file uploads. That choice is fixed once made.',
    source: SRC.fileLibrary
  },

  {
    id: 'DA-018',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'file-library',
    stem: [
      'How is an Agentforce Data Library connected to an agent?',
      'An admin has built a Data Library. What are the next steps to let the agent use it?'
    ],
    options: [
      { correct: true, text: 'Open the agent in the builder, select the library on the Knowledge tab, save and activate.', why: 'The library is chosen in the agent\'s Knowledge settings.' },
      { correct: false, text: 'Paste the library\'s files into the agent\'s instructions.', why: 'The retriever supplies the content.' },
      { correct: false, text: 'Add the library as a variable in the `config` block.', why: 'Not how libraries are linked.' },
      { correct: false, text: 'Nothing. Every agent uses every library automatically.', why: 'You select the library for the agent.' }
    ],
    explanation: 'Open the agent in the builder, go to the Knowledge tab and select the library (or create a new one). Save and activate.\n\nTo test, check the search index and library are ready, restart the preview conversation, ask questions and check the answers against the source files.',
    source: SRC.fileLibrary
  },

  {
    id: 'DA-019',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'library-rules',
    stem: [
      'An admin wants one Data Library to hold both knowledge articles and uploaded PDFs. What should they know?',
      'Which statement about Agentforce Data Library sources is true?'
    ],
    options: [
      { correct: true, text: 'A library supports one data source only. Create separate libraries, or use an ensemble retriever through a custom retriever library.', why: 'One source per library, fixed once chosen.' },
      { correct: false, text: 'A library can mix any number of sources.', why: 'Multiple sources at once aren\'t supported.' },
      { correct: false, text: 'Add the second source later by editing the library.', why: 'The source can\'t be changed after it is chosen.' },
      { correct: false, text: 'PDFs must be converted to knowledge articles first.', why: 'Uploaded files are a source of their own.' }
    ],
    explanation: 'You can create many libraries and assign them to many features, but each feature uses only one library at a time. To ground one agent on several sources, create an ensemble retriever and use it through a custom retriever library.',
    source: SRC.librarySource
  },

  {
    id: 'DA-020',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'library-rules',
    stem: [
      'An agent needs to search public websites for answers. What should the admin use?',
      'Can a new Agentforce Data Library use web search as its source?'
    ],
    options: [
      { correct: true, text: 'No. Use the Search the Web standard action for agents, or a web retriever in prompt templates.', why: 'New web search libraries aren\'t supported.' },
      { correct: false, text: 'Yes. Create a web search library like any other.', why: 'Existing web search libraries are read-only and new ones can\'t be created.' },
      { correct: false, text: 'Upload saved copies of the web pages to a knowledge library.', why: 'Not the supported approach for web search.' },
      { correct: false, text: 'Agents can\'t search the web at all.', why: 'The Search the Web action does this.' }
    ],
    explanation: 'Agentforce Data Library no longer supports new web search libraries. Both the Search the Web action and the web retriever search the web without one.',
    source: SRC.libraryWeb
  },

  {
    id: 'DA-021',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'custom-retriever',
    stem: [
      'When would an admin create a Data Library with the Custom Retriever data type?',
      'What does a custom retriever data library let you do?'
    ],
    options: [
      { correct: true, text: 'To connect other Data 360 sources such as an ensemble retriever, or to use a home org\'s libraries from a companion org', why: 'Both are uses of custom retriever libraries.' },
      { correct: false, text: 'To write retrievers in Apex', why: 'Retrievers are created in Data 360 and AI Models.' },
      { correct: false, text: 'To skip Data 360 entirely', why: 'Data 360 is required.' },
      { correct: false, text: 'To connect to retrievers in any org without setup', why: 'Only active retrievers in the home org are listed.' }
    ],
    explanation: 'First create a search index and an active retriever in Data 360. Then create the library, choose Custom Retriever and select the retriever. To use a home org library in a companion org, configure it in the home org first.',
    source: SRC.libraryCustomRetriever
  },

  {
    id: 'DA-022',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'custom-retriever',
    stem: 'In the list of retrievers for a custom retriever library, which prefix shows a retriever for a knowledge-based search index?',
    options: [
      { correct: true, text: '`KA_`', why: 'Knowledge-based indexes.' },
      { correct: false, text: '`File_`', why: 'Uploaded file indexes.' },
      { correct: false, text: '`Web_`', why: 'Web sources (read-only libraries).' },
      { correct: false, text: '`ADL_`', why: 'Not one of the listed retriever prefixes.' }
    ],
    explanation: 'Retrievers starting `File_` connect to uploaded file indexes, `KA_` to knowledge indexes and `Web_` to web sources. Only active retrievers are listed.',
    source: SRC.libraryCustomRetriever
  },

  {
    id: 'DA-023',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    stem: [
      'A company with three brands wants Answer Questions with Knowledge to filter the library by brand at run time. What should the Agentforce Specialist know?',
      'Which pre-filters are supported when a Data Library is used with the Answer Questions with Knowledge prompt template?'
    ],
    options: [
      { correct: true, text: 'Only static pre-filters are supported. Use a separate library per brand, or a custom Apex invocable action that passes the filter.', why: 'Dynamic pre-filters aren\'t supported here.' },
      { correct: false, text: 'Dynamic pre-filters work by default.', why: 'Not supported with this template.' },
      { correct: false, text: 'Filters aren\'t possible, so merge the brands\' content.', why: 'There are workarounds.' },
      { correct: false, text: 'Add the brand to the agent\'s welcome message.', why: 'Doesn\'t filter retrieval.' }
    ],
    explanation: 'Help suggests either one Data Library per category or brand, or a custom Apex invocable action that passes filter values at run time.',
    source: SRC.libraryCustomRetriever
  },

  {
    id: 'DA-024',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'library-rules',
    stem: 'Which two are prerequisites or costs of using Agentforce Data Library?',
    options: [
      { correct: true, text: 'Data 360 must be set up.', why: 'Libraries are built on Data 360.' },
      { correct: true, text: 'Libraries consume Data 360 credits.', why: 'Stated in Help.' },
      { correct: false, text: 'A separate Tableau licence for each library', why: 'Not required.' },
      { correct: false, text: 'A MuleSoft connection', why: 'Not required.' },
      { correct: false, text: 'A Marketing Cloud account', why: 'Not required.' }
    ],
    explanation: 'Data libraries run on Data 360 for ingestion, indexing and retrieval, and use Data 360 credits.',
    source: SRC.librarySource
  },

  {
    id: 'DA-025',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    stem: [
      'After a file-based Data Library is saved, which part is created last?',
      'In what order does Data Library setup run?'
    ],
    options: [
      { correct: true, text: 'Data stream, data lake and data model objects, mapping, search index, chunking, then the retriever last', why: 'The retriever comes once the index is ready.' },
      { correct: false, text: 'Retriever first, then the search index', why: 'The retriever needs the index.' },
      { correct: false, text: 'Chunking first, before any data stream exists', why: 'Data must be ingested first.' },
      { correct: false, text: 'Everything is created at the same moment', why: 'Each step depends on the one before.' }
    ],
    explanation: 'Each step must succeed before the next. A status card on the library setup page shows progress and links to the Data 360 objects. Web search libraries create only a retriever, with no search index.',
    source: SRC.libraryConcept
  },

  {
    id: 'DA-026',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-pieces',
    stem: 'How does the search index decide which chunks to return for a query?',
    options: [
      { correct: true, text: 'Each chunk gets a similarity score against the query, and the highest-scoring chunks are returned', why: 'Similarity drives relevance.' },
      { correct: false, text: 'It returns chunks in the order the files were uploaded', why: 'Order isn\'t relevance.' },
      { correct: false, text: 'It returns every chunk and lets the LLM choose', why: 'That would overflow the token limit.' },
      { correct: false, text: 'An admin picks the chunks for each question', why: 'Retrieval is automatic.' }
    ],
    explanation: 'Chunks with high similarity scores point to relevant sources, which are added to the prompt. This keeps the prompt within the token limit while adding context-specific information.',
    source: SRC.libraryConcept
  },

  {
    id: 'DA-027',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'content-prep',
    stem: [
      'Knowledge articles cover several loosely related subjects each, and agent answers often mix them up. What does Salesforce advise?',
      'Why should each knowledge article focus on one clearly defined user intent?'
    ],
    options: [
      { correct: true, text: 'Split them so each article answers one intent. Mixed articles dilute embeddings and make the model combine mismatched ideas.', why: 'AI retrieves in fragments.' },
      { correct: false, text: 'Merge them into one long article so everything is in one place', why: 'Makes the problem worse.' },
      { correct: false, text: 'Add more instructions to the agent', why: 'Fix the content, not the instructions.' },
      { correct: false, text: 'Turn off chunking', why: 'Chunking is needed for retrieval.' }
    ],
    explanation: 'Salesforce\'s content guidance has four pillars: specific, organised, detailed and accurate. It is based on Knowledge-Centered Service (KCS) practices. Write for the audience, keep one intent per article and use consistent terms.',
    source: SRC.libraryPrepare
  },

  {
    id: 'DA-028',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'content-prep',
    stem: 'Which two writing practices help retrieved chunks make sense on their own?',
    options: [
      { correct: true, text: 'Lead with the answer at the top of each section', why: 'The key answer is visible in the chunk.' },
      { correct: true, text: 'Keep steps self-contained instead of writing "see above"', why: 'A chunk might not include the earlier text.' },
      { correct: false, text: 'Put all content in one long text field', why: 'Splitting into fields helps indexing.' },
      { correct: false, text: 'Use screenshots without captions', why: 'AI needs text descriptions.' },
      { correct: false, text: 'Use different terms for the same thing to add variety', why: 'Consistent terms link concepts.' }
    ],
    explanation: 'Use headings to show structure. Split long content into fields such as Question, Description, Resolution and Exceptions. Add alt text and captions to visuals.',
    source: SRC.libraryPrepare
  },

  {
    id: 'DA-029',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    group: 'content-prep',
    stem: [
      'Customer-facing and internal technical content sit in the same knowledge base. How should the agent be kept from returning internal content to customers?',
      'What does Salesforce suggest for separating knowledge content by audience?'
    ],
    options: [
      { correct: true, text: 'Separate it before retrieval with dedicated fields or articles per audience, and filter at run time with access-tier metadata', why: 'Both pre-retrieval and run-time separation.' },
      { correct: false, text: 'Ask the LLM to ignore internal content', why: 'Instructions aren\'t enforcement.' },
      { correct: false, text: 'Delete the internal content', why: 'Staff still need it.' },
      { correct: false, text: 'Rely on toxicity detection', why: 'Not designed for this.' }
    ],
    explanation: 'Metadata such as product tags, target audience, version and access tier improves filtering, ranking and compliance. Also check sharing settings and channels. Articles blocked by sharing won\'t appear in answers.',
    source: SRC.libraryPrepare
  },

  {
    id: 'DA-030',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    stem: 'Which tools does Salesforce suggest for testing and monitoring knowledge retrieval quality?',
    options: [
      { correct: true, text: 'Retriever Playground and Testing Center before release, then Knowledge/RAG Quality Data and Metrics afterwards', why: 'Test before, monitor after.' },
      { correct: false, text: 'Debug logs only', why: 'Not designed for retrieval quality.' },
      { correct: false, text: 'Field history tracking on Knowledge', why: 'Tracks edits, not retrieval.' },
      { correct: false, text: 'Nothing. Retrieval can\'t be tested.', why: 'There are dedicated tools.' }
    ],
    explanation: 'Testing Center can generate test cases from an agent\'s connected knowledge sources. After deployment, Knowledge/RAG Quality Data and Metrics, Agent Optimization and Agent Analytics show where content is outdated or missing.',
    source: SRC.libraryPrepare
  },

  {
    id: 'DA-031',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-flow',
    stem: [
      'A prompt template with a retriever runs. What happens to the query before the search?',
      'Put the RAG run-time steps in order. Which is correct?'
    ],
    options: [
      { correct: true, text: 'The template calls the retriever, the query is vectorised, relevant context is retrieved, the prompt is filled in, then the LLM responds', why: 'The online sequence in Help.' },
      { correct: false, text: 'The LLM answers first, then the retriever adds sources', why: 'Retrieval comes first.' },
      { correct: false, text: 'The whole index is sent to the LLM, which searches it', why: 'Only relevant context is added.' },
      { correct: false, text: 'The query is chunked and stored in the index', why: 'The query is vectorised, not indexed.' }
    ],
    explanation: 'Vectorising the query lets the search find semantic matches in the index, which is already vectorised. RAG has an offline part (connect data, chunk and vectorise into a search index) and an online part (retrieve, augment, generate).',
    source: SRC.ragAbout
  },

  {
    id: 'DA-032',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-flow',
    stem: [
      'Why use RAG instead of fine-tuning a model on company documents?',
      'What is a key benefit of retrieval augmented generation?'
    ],
    options: [
      { correct: true, text: 'It brings current, proprietary information into the prompt without retraining or fine-tuning the model', why: 'The core benefit of RAG.' },
      { correct: false, text: 'It permanently teaches the LLM your data', why: 'RAG adds context per prompt. The model isn\'t changed.' },
      { correct: false, text: 'It removes the need for prompts', why: 'RAG fills in prompts.' },
      { correct: false, text: 'It makes the LLM ignore its training', why: 'It adds information. It doesn\'t erase anything.' }
    ],
    explanation: 'Most LLMs were trained on static public content. RAG supplies accurate, up-to-date facts from your knowledge store, so responses fit your context and use case.',
    source: SRC.ragAbout
  },

  {
    id: 'DA-033',
    section: 'data',
    objective: 'Foundational Data 360 concepts: chunking, indexing and retrievers',
    group: 'rag-pieces',
    stem: 'What is vectorisation in a Data 360 search index?',
    options: [
      { correct: true, text: 'Converting chunks of text into numeric representations that capture semantic similarity', why: 'Lets search match on meaning.' },
      { correct: false, text: 'Encrypting chunks for storage', why: 'Not what vectorisation means.' },
      { correct: false, text: 'Translating chunks into English', why: 'Not what vectorisation means.' },
      { correct: false, text: 'Counting the words in each chunk', why: 'Not what vectorisation means.' }
    ],
    explanation: 'A search index configuration chunks the content into passages such as sentences or paragraphs, then vectorises them. Queries are vectorised the same way, so the search can find semantic matches.',
    source: SRC.ragAbout
  },

  {
    id: 'DA-034',
    section: 'data',
    objective: 'Considerations of Agentforce Data Library',
    stem: 'An admin creates a Data Library with default settings. Which RAG components does it set up?',
    options: [
      { correct: true, text: 'The vector data store, search index, retriever, prompt template and standard action, all with default settings', why: 'The quick start for RAG.' },
      { correct: false, text: 'Only the prompt template', why: 'It sets up the whole chain.' },
      { correct: false, text: 'Only the vector data store. Everything else is built by hand.', why: 'Everything is created automatically.' },
      { correct: false, text: 'A new LLM trained on the files', why: 'RAG doesn\'t train models.' }
    ],
    explanation: 'Creating a Data Library is the fastest RAG setup. You can then customise any component, for example creating custom retrievers in AI Models (formerly Einstein Studio).',
    source: SRC.ragAbout
  },

  // ---------------- Testing, Deployment and Maintenance (10%) ----------------

  {
    id: 'TE-001',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    stem: 'Which three expectations can a Testing Center test case check for a given utterance?',
    options: [
      { correct: true, text: 'The expected topic (subagent)', why: 'Checks the agent routed correctly.' },
      { correct: true, text: 'The expected actions', why: 'Checks the agent ran the right actions.' },
      { correct: true, text: 'The expected response', why: 'Described in plain language and compared with the actual response.' },
      { correct: false, text: 'The expected number of tokens used', why: 'Not a test case expectation.' },
      { correct: false, text: 'The expected LLM provider', why: 'Not a test case expectation.' },
      { correct: false, text: 'The expected record owner', why: 'Not a test case expectation.' }
    ],
    explanation: 'Each test case pairs an utterance with an expected topic, expected actions and an expected response. Results show actual against expected, with a pass or fail for each.\n\nThe UI now labels topics as subagents in places, but the idea is the same.',
    source: SRC.testing
  },

  {
    id: 'TE-002',
    section: 'testing',
    objective: 'Explain how Testing Center evaluations work',
    stem: 'A test case fails on topic even though the agent routed to the right topic in Conversation Preview. The test lists the topic as "Order Status". What is the likely cause?',
    options: [
      { correct: true, text: 'The expected topic must be the topic\'s API name, not its label.', why: 'Testing Center compares API names.' },
      { correct: false, text: 'Testing Center only tests the default topic.', why: 'It tests any topic.' },
      { correct: false, text: 'Conversation Preview uses a different LLM from Testing Center.', why: 'Not the cause here.' },
      { correct: false, text: 'Topic checks only pass when the response check also passes.', why: 'Each expectation passes or fails on its own.' }
    ],
    explanation: 'Use the API name (for example `Order_Status`) for the expected topic. A failure can come from a wrong expectation rather than a wrong agent, so check the test case before changing the agent.',
    source: SRC.testing
  },

  {
    id: 'TE-003',
    section: 'testing',
    objective: 'Considerations for deploying an agent from sandbox to production',
    stem: 'Which two steps are needed when moving an agent from a sandbox to production?',
    options: [
      { correct: true, text: 'Create the agent user in production and assign its permission sets.', why: 'Users aren\'t deployed as metadata.' },
      { correct: true, text: 'Check that Einstein, Agentforce and Data 360 are turned on in production.', why: 'The target org needs the same features and licences.' },
      { correct: false, text: 'Copy the sandbox agent user\'s password into production.', why: 'Users and passwords don\'t move between orgs.' },
      { correct: false, text: 'Deploy only the agent. Its flows, Apex and templates follow by themselves.', why: 'Dependencies must be included in the deployment.' },
      { correct: false, text: 'Refresh the production org from the sandbox.', why: 'You refresh sandboxes from production, never the other way.' }
    ],
    explanation: 'Include every dependency: custom Apex, flows, prompt templates and the permission sets for the agent user. Then create and set up the agent user in the target org, and check licences and features are in place.',
    source: SRC.deploy
  },

  {
    id: 'TE-004',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    group: 'test-csv',
    stem: [
      'An admin fills in the Testing Center CSV template. Which statement is true?',
      'Which rule applies to test cases uploaded to Testing Center as a CSV?'
    ],
    options: [
      { correct: true, text: 'Utterance is required, at least one other column must be filled, and empty values count as failures.', why: 'Rules stated for the testing template.' },
      { correct: false, text: 'Only the Expected Response column is required.', why: 'Utterance is the required column.' },
      { correct: false, text: 'Empty values are skipped and count as passes.', why: 'Empty values are treated as failures.' },
      { correct: false, text: 'Each CSV can test several agents at once.', why: 'Each test run targets one agent.' }
    ],
    explanation: 'The template (testing_template.csv) has one test case per line: Utterance, Expected Subagent (API name), Expected Actions and Expected Response. Expected Actions is a bracketed list of action API names in single quotes, for example `[\'IdentifyRecordByName\',\'QueryRecords\']`.',
    source: SRC.testing
  },

  {
    id: 'TE-005',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    stem: [
      'Why does Salesforce advise running Testing Center in a sandbox rather than production?',
      'An admin plans to run a large Testing Center suite in production. What is the main risk?'
    ],
    options: [
      { correct: true, text: 'Tests run the agent\'s real actions, which can change CRM data.', why: 'Testing agents can modify records.' },
      { correct: false, text: 'Testing Center isn\'t available in production at all.', why: 'The reason is the data, not availability.' },
      { correct: false, text: 'Production agents can\'t be selected in a test suite.', why: 'Not the reason.' },
      { correct: false, text: 'Tests in production delete the agent\'s conversation history.', why: 'Not something tests do.' }
    ],
    explanation: 'Testing Center runs the agent with each utterance, so actions really execute. Salesforce\'s advice is to use it only in a sandbox.\n\nCosts have changed: Trailhead says tests consume credits, but Help says testing is unmetered from Summer \'26. Data 360 queries made by tests are still metered.',
    source: SRC.testing
  },

  {
    id: 'TE-006',
    section: 'testing',
    objective: 'Explain how Testing Center evaluations work',
    group: 'test-results',
    stem: [
      'A Testing Center run shows Response Evaluation: Pass and Action Evaluation: Fail for one test case. What does this mean?',
      'How are Testing Center results evaluated for each test case?'
    ],
    options: [
      { correct: true, text: 'Subagent, action and response are evaluated separately, so a test can pass one and fail another.', why: 'Each evaluation is its own pass or fail.' },
      { correct: false, text: 'The test is broken. A test must pass or fail everything together.', why: 'Evaluations are independent.' },
      { correct: false, text: 'The response check is skipped when an action fails.', why: 'Every selected evaluation runs.' },
      { correct: false, text: 'Only the response is evaluated. Subagent and action are for information.', why: 'All three are evaluated.' }
    ],
    explanation: 'The results show Subagent Evaluation Pass %, Action Evaluation Pass % and Response Evaluation Pass % for the run. Each row shows expected and actual subagent and actions, the agent\'s response, and a pass or fail for each evaluation.',
    source: SRC.testResults
  },

  {
    id: 'TE-007',
    section: 'testing',
    objective: 'Explain how Testing Center evaluations work',
    group: 'test-results',
    stem: 'A test case fails on actions. What is the best first step to troubleshoot it?',
    options: [
      { correct: true, text: 'Open the agent in the builder and run the same utterance in Conversation Preview to see the subagent and actions chosen.', why: 'Shows exactly what the agent did.' },
      { correct: false, text: 'Delete the test case.', why: 'Hides the problem.' },
      { correct: false, text: 'Rewrite the agent\'s instructions straight away.', why: 'The expectation might be wrong, not the agent.' },
      { correct: false, text: 'Deactivate the actions that didn\'t run.', why: 'Makes the agent worse.' }
    ],
    explanation: 'Conversation Preview shows the session, user prompt, subagent selected and actions launched. In the Trailhead example, the agent was right and the test expected too many actions.\n\nFixes include correcting the expected actions, changing the utterance or adding a separate negative test.',
    source: SRC.testResults
  },

  {
    id: 'TE-008',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    stem: 'Which three changes should prompt a team to rerun its agent tests?',
    options: [
      { correct: true, text: 'Changes to the data the agent uses', why: 'New data can change answers.' },
      { correct: true, text: 'Changes to permissions', why: 'Access affects what actions can do.' },
      { correct: true, text: 'Changes to subagents, actions or prompts', why: 'Direct changes to behaviour.' },
      { correct: false, text: 'A change to a user\'s profile photo', why: 'Unrelated to agent behaviour.' },
      { correct: false, text: 'A new Salesforce login page logo', why: 'Unrelated to agent behaviour.' },
      { correct: false, text: 'A change to a report folder name', why: 'Unrelated to agent behaviour.' }
    ],
    explanation: 'Retest as agents and the business change: data, permissions, subagents, actions, prompts, related product features and business processes.',
    source: SRC.testStrategy
  },

  {
    id: 'TE-009',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    stem: 'An admin is building a test set for a new agent. Which approach matches Salesforce\'s testing guidance?',
    options: [
      { correct: true, text: 'Start with 10 to 20 AI-generated scenarios, review them, include out-of-scope and guardrail tests, and grow the set as the agent improves', why: 'Volume, diversity and quality.' },
      { correct: false, text: 'Generate 5,000 scenarios at once and accept them without review', why: 'Review a small batch first.' },
      { correct: false, text: 'Only test questions the agent is designed to answer', why: 'Negative tests matter too.' },
      { correct: false, text: 'Skip human review because automated checks catch everything', why: 'Humans catch tone and context problems.' }
    ],
    explanation: 'The five steps are: identify scenarios and create test data, set evaluation parameters, run and evaluate, validate the results with human review, then iterate.\n\nGood test sets have volume, diversity (including out-of-scope inputs and guardrail challenges) and quality.',
    source: SRC.testStrategy
  },

  {
    id: 'TE-010',
    section: 'testing',
    objective: 'Considerations for deploying an agent from sandbox to production',
    group: 'deploy-order',
    stem: [
      'An agent uses Enhanced Chat and an Omni-Channel flow. When deploying to production, when should those be deployed?',
      'Which items must be in the target org before the Agentforce metadata is deployed?'
    ],
    options: [
      { correct: true, text: 'Before the Agentforce metadata', why: 'The agent depends on them.' },
      { correct: false, text: 'After the agent is activated in production', why: 'They must exist first.' },
      { correct: false, text: 'Never. Channels are rebuilt by hand in each org.', why: 'They can be deployed.' },
      { correct: false, text: 'At the same time as a production refresh', why: 'You don\'t refresh production.' }
    ],
    explanation: 'Enhanced Chat, Embedded Service Deployments and Omni-Channel flows must be deployed before the Agentforce metadata. The Salesforce CLI retrieves the agent\'s metadata from the sandbox and deploys it to the target org.',
    source: SRC.deploy
  },

  {
    id: 'TE-011',
    section: 'testing',
    objective: 'Considerations for deploying an agent from sandbox to production',
    group: 'deploy-order',
    stem: 'An agent has been deployed to production. Which two checks belong in the post-deployment steps?',
    options: [
      { correct: true, text: 'Confirm the agent is active and the deployed flows have the right version active.', why: 'Deployed items aren\'t always active.' },
      { correct: true, text: 'Publish the Embedded Service web deployment, if the agent uses one.', why: 'Needed before customers see the chat.' },
      { correct: false, text: 'Delete the sandbox agent so the two don\'t clash.', why: 'Orgs are separate. Keep the sandbox for future work.' },
      { correct: false, text: 'Copy the sandbox agent user\'s password.', why: 'Create the agent user in production instead.' },
      { correct: false, text: 'Turn off the Trust Layer while testing.', why: 'Not a deployment step.' }
    ],
    explanation: 'After deployment: check the agent is active, flows have the right active versions, and the web deployment is published. Then check subagents, instructions, variables and filters, confirm permissions, and confirm the agent responds.',
    source: SRC.deploy
  },

  {
    id: 'TE-012',
    section: 'testing',
    objective: 'Considerations for deploying a template from sandbox to production',
    stem: [
      'Which metadata type is used to move a prompt template between orgs?',
      'A developer adds a prompt template to a deployment package. Which metadata type is it?'
    ],
    options: [
      { correct: true, text: '`GenAiPromptTemplate`', why: 'The metadata type for prompt templates.' },
      { correct: false, text: '`EmailTemplate`', why: 'For email templates, not prompt templates.' },
      { correct: false, text: '`StaticResource`', why: 'For static files.' },
      { correct: false, text: '`CustomMetadata`', why: 'For custom metadata records.' }
    ],
    explanation: 'Prompt templates deploy as `GenAiPromptTemplate`. Working with this type needs Prompt Builder turned on and the Prompt Template Manager permission.\n\nInclude any flows or Apex classes the template uses for grounding, and check the right version is active in the target org.',
    source: SRC.promptTemplateMeta
  },

  {
    id: 'TE-013',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    stem: 'Which two permissions does a user need for the new Testing Center in Agentforce Studio (Beta)?',
    options: [
      { correct: true, text: 'Manage Agentforce Grids', why: 'Required for the new Testing Center.' },
      { correct: true, text: 'Manage Agentforce Testing', why: 'Required for the new Testing Center.' },
      { correct: false, text: 'Modify All Data', why: 'Not one of the listed permissions.' },
      { correct: false, text: 'Prompt Template User', why: 'For running prompt templates.' },
      { correct: false, text: 'View Setup and Configuration only', why: 'Not enough.' }
    ],
    explanation: 'The new Testing Center needs Manage Agentforce Grids and Manage Agentforce Testing, added to a permission set. It doesn\'t need the System Administrator profile.\n\nThe older Testing Center in Setup needs the System Administrator profile with either Manage AI Agents or Customize Application.',
    source: SRC.testing
  },

  {
    id: 'TE-014',
    section: 'testing',
    objective: 'Explain how Testing Center evaluations work',
    group: 'scorers',
    stem: [
      'Which default scorers run on every turn-level test in the new Testing Center?',
      'In turn-level testing, how is the Response Evaluation score produced?'
    ],
    options: [
      { correct: true, text: 'Response Evaluation (an LLM judge compares the expected and actual response), Subagent Assertion and Action Assertion', why: 'The three turn-level default scorers.' },
      { correct: false, text: 'Toxicity, latency and cost', why: 'Not the default scorers.' },
      { correct: false, text: 'Only Task Resolution', why: 'That is a conversation-level scorer.' },
      { correct: false, text: 'A word-for-word string match of the response', why: 'An LLM judge compares meaning.' }
    ],
    explanation: 'Default scorers always run. In conversation-level tests the subagent and action scorers are called Subagent Evaluation and Actions Evaluation, and Task Resolution checks whether the user\'s issue was resolved.',
    source: SRC.defaultScorers
  },

  {
    id: 'TE-015',
    section: 'testing',
    objective: 'Explain how Testing Center evaluations work',
    group: 'scorers',
    stem: [
      'Response Evaluation scores are unexpectedly low. The Expected Response column says "The agent should mention the order number and be polite." What is wrong?',
      'What should the Expected Response field in a test case contain?'
    ],
    options: [
      { correct: true, text: 'The response you expect the agent to give, not instructions about the response', why: 'Instructions in that field give inaccurate scores.' },
      { correct: false, text: 'Instructions for the LLM judge on how to score', why: 'Help calls this a common mistake.' },
      { correct: false, text: 'The API name of the expected action', why: 'That goes in Expected Actions.' },
      { correct: false, text: 'Nothing. Leave it blank so the LLM decides.', why: 'Empty values count as failures.' }
    ],
    explanation: 'Write the Expected Response as the answer itself, for example "Your order 12345 will arrive on Friday." The LLM judge then compares it with the agent\'s real response.',
    source: SRC.defaultScorers
  },

  {
    id: 'TE-016',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    stem: 'Which two statements about conversation-level testing (beta) are true?',
    options: [
      { correct: true, text: 'Employee agents aren\'t supported.', why: 'Stated limitation.' },
      { correct: true, text: 'If escalation is triggered, the conversation ends with "User requested transfer to agent."', why: 'Escalation isn\'t supported.' },
      { correct: false, text: 'Custom scorers and context variables are fully supported.', why: 'Neither is supported for conversation-level tests.' },
      { correct: false, text: 'Conversations can run for unlimited turns.', why: 'The beta limit is 20 turns.' },
      { correct: false, text: 'Verification codes can be typed in during simulated conversations.', why: 'They can\'t. Set context variables instead.' }
    ],
    explanation: 'Beta limits: 3 concurrent suites, 20 turns per conversation, up to 20 generated or 1,000 uploaded test cases. Voice simulated responses are English only. If the agent loops on verification, put bypass details in the instructions and test objective.',
    source: SRC.testingConsiderations
  },

  {
    id: 'TE-017',
    section: 'testing',
    objective: 'Considerations for deploying a template from sandbox to production',
    group: 'template-changesets',
    stem: [
      'A prompt template is deployed to production by change set. It was active in the sandbox but is inactive in production. Why?',
      'What controls whether a prompt template active in the source org arrives active after a change set deployment?'
    ],
    options: [
      { correct: true, text: 'By default deployed templates arrive inactive. A setting in Einstein Setup (Deploy Prompt Templates) activates them on deploy, for change sets only.', why: 'Off by default.' },
      { correct: false, text: 'Change sets always deactivate templates, and nothing can change that.', why: 'The Einstein Setup setting can.' },
      { correct: false, text: 'The template failed to deploy.', why: 'It deployed but wasn\'t activated.' },
      { correct: false, text: 'The setting also controls CLI and package deployments.', why: 'It applies to change sets only.' }
    ],
    explanation: 'With the setting on, templates active in the source become active in the target, and inactive ones stay inactive. Without it, activate templates by hand after deployment.',
    source: SRC.templateChangeSets
  },

  {
    id: 'TE-018',
    section: 'testing',
    objective: 'Considerations for deploying a template from sandbox to production',
    group: 'template-changesets',
    stem: 'Which two statements about deploying prompt templates with change sets are true?',
    options: [
      { correct: true, text: 'By default all versions, active and inactive, are deployed. A setting can deploy only the active version.', why: '"Deploy Only Active Version" is off by default.' },
      { correct: true, text: 'If the template uses a custom LLM configuration, the target org needs a model with the same name or the deployment fails.', why: 'Stated consideration.' },
      { correct: false, text: 'Change sets can delete prompt templates in the target org.', why: 'Templates can\'t be deleted by change set.' },
      { correct: false, text: 'Published versions in the target are overwritten with new content.', why: 'Published versions are immutable and skipped.' },
      { correct: false, text: 'Dependencies are added automatically, so only the template is needed.', why: 'Add all resources, then their dependencies.' }
    ],
    explanation: 'With "Deploy Only Active Version" on, a template with no active version fails to deploy. Existing versions in the target are never deleted.',
    source: SRC.templateChangeSets
  },

  {
    id: 'TE-019',
    section: 'testing',
    objective: 'Considerations for deploying a template from sandbox to production',
    group: 'template-flows',
    stem: [
      'A prompt template grounded by a template-triggered flow fails to deploy. What does Salesforce advise?',
      'How should a template-triggered prompt flow be built so it deploys cleanly with its template?'
    ],
    options: [
      { correct: true, text: 'Use Manual Inputs in the flow and deploy the template and flow together. If it still fails, deploy the flow first, then the template.', why: 'Flows with Automatic Inputs make the deployment fail.' },
      { correct: false, text: 'Use Automatic Inputs so the template can find the flow', why: 'That causes the failure.' },
      { correct: false, text: 'Rebuild the flow by hand in production', why: 'Deployment works with the right inputs.' },
      { correct: false, text: 'Convert the flow to Apex', why: 'Not needed.' }
    ],
    explanation: 'To deploy with the CLI, the template needs at least one version. Deployed flows aren\'t auto-activated. A template that calls an inactive flow gives a run-time error.',
    source: SRC.templateDeploy
  },

  {
    id: 'TE-020',
    section: 'testing',
    objective: 'Considerations for deploying a template from sandbox to production',
    group: 'template-flows',
    stem: 'After deployment, a prompt template throws an error when it runs. It references a flow that came in the same change set. What is the likely cause?',
    options: [
      { correct: true, text: 'The flow was deployed but not activated, and a template that runs an inactive flow errors at run time', why: 'Deployed flows aren\'t auto-activated.' },
      { correct: false, text: 'Change sets can\'t include flows', why: 'They can.' },
      { correct: false, text: 'The template is a Flex template', why: 'The template type isn\'t the issue.' },
      { correct: false, text: 'The user lacks Prompt Template Manager', why: 'Running needs Prompt Template User, and this is a flow error.' }
    ],
    explanation: 'Activate deployed flows according to the flow guidelines. Also, a template in use can\'t have its active version deactivated unless another version is active, and its active version can\'t be deleted.',
    source: SRC.templateChangeSets
  },

  {
    id: 'TE-021',
    section: 'testing',
    objective: 'Test an agent using Testing Center',
    stem: 'From Summer \'26, which Testing Center activity is still metered?',
    options: [
      { correct: true, text: 'Data 360 queries made by tests', why: 'Everything else in testing is unmetered.' },
      { correct: false, text: 'Generating test cases', why: 'Unmetered.' },
      { correct: false, text: 'Agent actions run during tests', why: 'Unmetered.' },
      { correct: false, text: 'Evaluating results', why: 'Unmetered.' }
    ],
    explanation: 'From Summer \'26, Testing Center doesn\'t consume Einstein Requests or Flex Credits for any test type or agent type, including test creation, actions during tests and evaluation. Data 360 queries are still metered. The exam is based on Spring \'26, so expect older wording too.',
    source: SRC.testingConsiderations
  },

  // ---------------- Governance and Observability (10%) ----------------

  {
    id: 'GO-001',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    stem: 'An admin turned on session tracing last week. Agent analytics show nothing for conversations before then. Why?',
    options: [
      { correct: true, text: 'Tracing only captures sessions after it is set up. Earlier sessions aren\'t backfilled.', why: 'Turn tracing on early.' },
      { correct: false, text: 'Analytics only show the last 24 hours.', why: 'Not the limit described.' },
      { correct: false, text: 'Older sessions were masked by the Trust Layer.', why: 'Masking doesn\'t hide sessions from analytics.' },
      { correct: false, text: 'The agent must be reactivated before old sessions appear.', why: 'Reactivating doesn\'t backfill data.' }
    ],
    explanation: 'Session tracing writes each session, turn, LLM call and action to the Session Tracing Data Model in Data 360. Analytics and monitoring build on that data, so nothing exists for sessions before it was set up.',
    source: SRC.observability
  },

  {
    id: 'GO-002',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    stem: 'An admin wants to group similar conversations to find which topics and actions give poor answers. Which capability fits?',
    options: [
      { correct: true, text: 'Agent optimisation in Agentforce Command Center, which clusters sessions to find weak topics and actions.', why: 'Built to analyse and cluster sessions.' },
      { correct: false, text: 'The Setup Audit Trail', why: 'Tracks configuration changes, not conversations.' },
      { correct: false, text: 'Field history tracking on the Case object', why: 'Tracks field changes on records.' },
      { correct: false, text: 'Debug logs for the agent user', why: 'Too low-level and short-lived for this.' }
    ],
    explanation: 'Analytics answers "how many": sessions, escalations, deflections and feedback. Optimisation goes deeper, clustering moments in conversations by intent and scoring answer quality, so you can fix the topics and actions that cause problems.',
    source: SRC.commandCenter
  },

  {
    id: 'GO-003',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    stem: 'Where is agent session trace data stored?',
    options: [
      { correct: true, text: 'In Data 360, using the Session Tracing Data Model', why: 'Analytics and dashboards build on these objects.' },
      { correct: false, text: 'In the Setup Audit Trail', why: 'That logs Setup changes.' },
      { correct: false, text: 'At the LLM provider', why: 'Zero data retention means the provider keeps nothing.' },
      { correct: false, text: 'In a text file in the agent\'s AiAuthoringBundle', why: 'The bundle holds the agent definition, not session data.' }
    ],
    explanation: 'Session tracing records sessions, interactions and steps as structured data in Data 360. That is what analytics, optimisation and health monitoring read from.',
    source: SRC.observability
  },

  {
    id: 'GO-004',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'observability-cost',
    stem: [
      'Which Agentforce Observability work still consumes credits?',
      'A team is budgeting for Agentforce Observability. Which item is still metered?'
    ],
    options: [
      { correct: true, text: 'Building new dashboards or ingesting external data sources', why: 'Net-new customisation is still metered.' },
      { correct: false, text: 'Session tracing', why: 'Unmetered for all Agentforce customers.' },
      { correct: false, text: 'The out-of-the-box dashboards', why: 'Unmetered, including changes to them.' },
      { correct: false, text: 'Drilling into session traces', why: 'Unmetered.' }
    ],
    explanation: 'Observability is unmetered across all Agentforce SKUs: session tracing, telemetry, metrics, the standard dashboards, drill-downs, alerts and traces. Usage still shows in Digital Wallet but doesn\'t count against Flex Credits.\n\nStill metered: new dashboards, ingesting external sources such as Snowflake, and new semantic data model objects.',
    source: SRC.observability
  },

  {
    id: 'GO-005',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    stem: [
      'A team wants to score every session for customer sentiment and mentions of competitors. What can they use?',
      'How are deflection and abandonment worked out in Agentforce Observability?'
    ],
    options: [
      { correct: true, text: 'LLM-based session evaluation with editable prompts, including custom LLM-as-judge scores', why: 'Deflection, abandonment and custom scores use an LLM over the whole session.' },
      { correct: false, text: 'A formula field on the Messaging Session object', why: 'Not how session quality is scored.' },
      { correct: false, text: 'The Setup Audit Trail', why: 'Tracks configuration changes.' },
      { correct: false, text: 'Testing Center response evaluations', why: 'Those score test cases, not real sessions.' }
    ],
    explanation: 'An LLM evaluates deflection and abandonment across the full session, using an editable prompt for each metric. Teams can add their own LLM-as-judge scores, such as sentiment, tone, competitor mentions or pricing signals.',
    source: SRC.observability
  },

  {
    id: 'GO-006',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    stem: 'Which two can Agentforce Observability show?',
    options: [
      { correct: true, text: 'A waterfall trace that follows delegations to other agents in a multi-agent workflow', why: 'Built for multi-agent debugging.' },
      { correct: true, text: 'Metrics sliced by subagent, action and intent', why: 'Analytics can be broken down this way.' },
      { correct: false, text: 'The LLM provider\'s copy of every prompt', why: 'Zero data retention: providers keep nothing.' },
      { correct: false, text: 'Each agent user\'s password history', why: 'Not part of observability.' },
      { correct: false, text: 'The Apex code coverage of each action', why: 'Not part of observability.' }
    ],
    explanation: 'Observability brings trust, RAG, health and quality metrics into one view. It shows errors at the point in the reasoning path where they happened, inline citations, and a waterfall trace across delegations to other agents.',
    source: SRC.observability
  },

  {
    id: 'GO-007',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    stem: [
      'Which Agent Script `config` setting turns on conversation logging for debugging and monitoring?',
      'An admin needs detailed event logs from an agent\'s conversations for debugging. Which `config` setting turns them on?'
    ],
    options: [
      { correct: true, text: '`enable_enhanced_event_logs: True`', why: 'Turns on conversation logging. The default is False.' },
      { correct: false, text: '`thought_chunks: True`', why: 'Streams the agent\'s thinking to the client.' },
      { correct: false, text: '`citation: True`', why: 'Adds source references to answers.' },
      { correct: false, text: '`groundedness: False`', why: 'Turns off the groundedness check.' }
    ],
    explanation: '`enable_enhanced_event_logs` in the `config` block turns on conversation logging for debugging and monitoring. It defaults to False.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'GO-008',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'tracing-data',
    stem: 'Which three levels does the Session Tracing Data Model use to structure agent activity?',
    options: [
      { correct: true, text: 'Sessions', why: 'A whole conversation.' },
      { correct: true, text: 'Interactions', why: 'The turns within a session.' },
      { correct: true, text: 'Steps', why: 'What happened within a turn, such as LLM calls and actions.' },
      { correct: false, text: 'Opportunities', why: 'A CRM object, not a tracing level.' },
      { correct: false, text: 'Campaigns', why: 'A CRM object, not a tracing level.' },
      { correct: false, text: 'Queues', why: 'Routing, not tracing.' }
    ],
    explanation: 'The Session Tracing Data Model logs each event down to a single turn: user input, planner decisions, prompt and action flows, gateway inputs and outputs, errors and the final output. Sessions, interactions and steps are structured tables, so analytics and alerts build straight from them.',
    source: SRC.observability
  },

  {
    id: 'GO-009',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'monitor-setup',
    stem: 'Which three settings must be turned on before Agent Analytics can show full data?',
    options: [
      { correct: true, text: 'Agentforce Session Tracing', why: 'Captures each conversation step by step.' },
      { correct: true, text: 'Audit and Feedback', why: 'Needed for quality and trust scores.' },
      { correct: true, text: 'Knowledge/RAG Quality Data and Metrics', why: 'Needed for retrieval quality scores.' },
      { correct: false, text: 'Field History Tracking on Case', why: 'Not part of agent analytics setup.' },
      { correct: false, text: 'Debug logs for the agent user', why: 'Not part of agent analytics setup.' },
      { correct: false, text: 'Setup Audit Trail export', why: 'Tracks configuration changes, not conversations.' }
    ],
    explanation: 'Turn on Agentforce Session Tracing, Audit and Feedback, and Knowledge/RAG Quality Data and Metrics, then install the analytics apps for each agent type. Data collection starts from that point. The data is aggregated in a Data 360 data model.',
    source: SRC.monitorStart
  },

  {
    id: 'GO-010',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'adlc',
    stem: [
      'What is the difference between testing and monitoring an agent?',
      'In the Agent Development Lifecycle, how does monitoring differ from testing?'
    ],
    options: [
      { correct: true, text: 'Testing checks the agent before release with designed test cases. Monitoring watches it over time with real conversations.', why: 'Lab versus real-world conditions.' },
      { correct: false, text: 'They are the same thing with different names.', why: 'They happen at different stages with different data.' },
      { correct: false, text: 'Monitoring happens only in sandboxes.', why: 'Monitoring looks at real usage.' },
      { correct: false, text: 'Testing happens only after the agent is in production.', why: 'Testing comes before release.' }
    ],
    explanation: 'The Agent Development Lifecycle (ADLC) runs Ideate, Build, Test, Deploy and Monitor, then round again. Observability applies mainly in the Test and Monitor phases.',
    source: SRC.monitorStart
  },

  {
    id: 'GO-011',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'outcome-metrics',
    stem: [
      'In Agent Analytics, what is the deflection rate?',
      'A session ended without being handed to a service rep or another agent. How is it counted?'
    ],
    options: [
      { correct: true, text: 'Deflected: the share of sessions that ended without escalation to a rep or another agent', why: 'Resolved without a handoff.' },
      { correct: false, text: 'The share of sessions where the user gave up', why: 'That is abandonment.' },
      { correct: false, text: 'The share of sessions where an action ran', why: 'That is engagement.' },
      { correct: false, text: 'The share of responses with a low toxicity score', why: 'That is a trust metric.' }
    ],
    explanation: 'Session outcomes are Deflected, Escalated, Abandoned or Ambiguous. Escalation counts handoffs to a rep or another agent. Abandonment counts sessions that timed out or ended without engagement.',
    source: SRC.monitorMetrics
  },

  {
    id: 'GO-012',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'outcome-metrics',
    stem: 'What is the default timeout after which an inactive agent session counts as abandoned?',
    options: [
      { correct: true, text: '2 hours', why: 'The default abandonment timeout.' },
      { correct: false, text: '5 minutes', why: 'Not the default.' },
      { correct: false, text: '24 hours', why: 'Not the default.' },
      { correct: false, text: 'There is no timeout. Sessions stay open for ever.', why: 'There is a default of 2 hours.' }
    ],
    explanation: 'Abandonment Rate is the share of sessions that timed out or ended without engagement. The default timeout is 2 hours.',
    source: SRC.monitorMetrics
  },

  {
    id: 'GO-013',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'outcome-metrics',
    stem: [
      'In Agent Analytics, when does a session count as engaged?',
      'What does the Engagement Rate measure?'
    ],
    options: [
      { correct: true, text: 'When the user got a reply tied to an action the agent triggered. At least one action must run.', why: 'No action, no engagement.' },
      { correct: false, text: 'When the user sent more than three messages.', why: 'Message count isn\'t the rule.' },
      { correct: false, text: 'When the user gave a thumbs up.', why: 'That is user satisfaction.' },
      { correct: false, text: 'When the session lasted longer than a minute.', why: 'Duration isn\'t the rule.' }
    ],
    explanation: 'Other effectiveness metrics: Success Rate is the share of interactions with action steps that completed without errors. Task Resolution Rate is the share of sessions the Trust Layer\'s task resolution detector judged fully resolved.',
    source: SRC.monitorMetrics
  },

  {
    id: 'GO-014',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'quality-scores',
    stem: [
      'Which quality score shows how closely an agent\'s answers stick to the grounded source data, such as knowledge articles?',
      'An agent\'s answers often contradict the knowledge base. Which score would show this?'
    ],
    options: [
      { correct: true, text: 'Answer Faithfulness', why: 'Measures adherence to grounded source data (0 to 1).' },
      { correct: false, text: 'Context Relevance', why: 'Measures whether the right data source was retrieved.' },
      { correct: false, text: 'Answer Relevance', why: 'Measures relevance to the question.' },
      { correct: false, text: 'Engagement Rate', why: 'Measures whether actions ran.' }
    ],
    explanation: 'Quality scores come from an LLM evaluator. Quality Score runs from 1 to 5. Answer Faithfulness, Answer Relevance and Context Relevance run from 0 to 1. They need Audit and Feedback and Knowledge/RAG Quality Data and Metrics turned on.',
    source: SRC.monitorMetrics
  },

  {
    id: 'GO-015',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'quality-scores',
    stem: 'An agent gives sensible answers but often pulls them from the wrong knowledge source. Which score is most likely low?',
    options: [
      { correct: true, text: 'Context Relevance', why: 'Measures whether the agent retrieved the correct data source.' },
      { correct: false, text: 'Answer Faithfulness', why: 'Measures sticking to whatever was retrieved.' },
      { correct: false, text: 'Average Agent Toxicity Score', why: 'A trust metric.' },
      { correct: false, text: 'Interruption Rate', why: 'A voice metric.' }
    ],
    explanation: 'Context Relevance checks retrieval. Answer Faithfulness checks the answer against what was retrieved. Answer Relevance checks the answer against the question. Together they show whether a problem is in retrieval or generation.',
    source: SRC.monitorMetrics
  },

  {
    id: 'GO-016',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    stem: [
      'Where do the Trust tab metrics in Agent Analytics come from, and what do they show?',
      'Which statement about the Average Agent Toxicity Score is true?'
    ],
    options: [
      { correct: true, text: 'From the Einstein Trust Layer: Adherence Response Rate and Average Agent Toxicity Score, where lower toxicity is better', why: 'Trust metrics come from the Trust Layer.' },
      { correct: false, text: 'From Testing Center: higher toxicity is better', why: 'Lower is better, and it comes from the Trust Layer.' },
      { correct: false, text: 'From Setup Audit Trail: changes made by admins', why: 'Unrelated.' },
      { correct: false, text: 'From the LLM provider\'s logs', why: 'Providers keep no data under zero data retention.' }
    ],
    explanation: 'Adherence Response Rate is the share of responses meeting the high-adherence threshold. Average Agent Toxicity Score runs from 0 to 1, lower is better. Both need Audit and Feedback turned on.',
    source: SRC.monitorMetrics
  },

  {
    id: 'GO-017',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    stem: [
      'An admin wants to find which subagents, intents or actions drive poor outcomes. Which Agent Analytics view fits?',
      'Which Agent Analytics tab compares a metric across subagents, intents or actions with colour-coded bars?'
    ],
    options: [
      { correct: true, text: 'Performance Insights', why: 'Breaks metrics down by subagent, intent or action.' },
      { correct: false, text: 'Usage', why: 'Counts sessions, interactions and users.' },
      { correct: false, text: 'Health', why: 'Shows error rate and durations.' },
      { correct: false, text: 'Voice', why: 'Shows interruption rate.' }
    ],
    explanation: 'Performance Insights shows one row per segment, with bar length for the value and colour for performance: green good, orange or red needs attention. The dashboards run on Tableau Next under Agentforce Studio > Observe & Optimize.',
    source: SRC.monitorMetrics
  },

  {
    id: 'GO-018',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'intents',
    stem: [
      'Some sessions in Sessions & Intents have no intent tag. Why?',
      'When does a cluster tag get created for intents?'
    ],
    options: [
      { correct: true, text: 'A tag needs at least 10 similar intents, and clustering runs weekly, so new or rare intents stay untagged for a while.', why: 'Clustering needs volume and runs weekly.' },
      { correct: false, text: 'Tags are added by hand by an admin.', why: 'An LLM pipeline creates them.' },
      { correct: false, text: 'Only escalated sessions get tags.', why: 'Any processed session can.' },
      { correct: false, text: 'Tags are created instantly as the customer types.', why: 'Processing happens after sessions close.' }
    ],
    explanation: 'The intent pipeline extracts intents from closed sessions, usually 4 to 5 hours after they close. The clustering pipeline runs weekly and tags groups of at least 10 similar intents. Sessions still processing appear under Unprocessed, but you can use the Trace tab straight away.',
    source: SRC.monitorSessions
  },

  {
    id: 'GO-019',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'intents',
    stem: 'A session has a low quality score. Which field explains why, and is the most useful starting point for a fix?',
    options: [
      { correct: true, text: 'The quality score reasoning in the Interaction Summary', why: 'The LLM\'s explanation of the score.' },
      { correct: false, text: 'The session ID', why: 'Identifies the session. It doesn\'t explain it.' },
      { correct: false, text: 'The transcript download button', why: 'Useful, but doesn\'t explain the score.' },
      { correct: false, text: 'The Usage tab', why: 'Shows counts, not reasons.' }
    ],
    explanation: 'The Interaction Summary shows the agent, latency, turns, subagents and actions triggered, the intent tag, the quality score and its reasoning. The Trace tab shows each processing step in time order, such as routing, retrieval and response generation, and where behaviour differed from the builder configuration.',
    source: SRC.monitorSessions
  },

  {
    id: 'GO-020',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    stem: 'A subagent has a low quality score, high escalation and low Answer Faithfulness. The traces show it retrieving overlapping knowledge articles. What is the best fix?',
    options: [
      { correct: true, text: 'Merge and archive the conflicting articles, update the subagent instructions, test in Testing Center, deploy, then recheck analytics', why: 'Fix the cause, test, then confirm.' },
      { correct: false, text: 'Turn off the groundedness check', why: 'Makes unfaithful answers more likely.' },
      { correct: false, text: 'Delete the subagent', why: 'Removes the capability instead of fixing it.' },
      { correct: false, text: 'Raise the abandonment timeout', why: 'Doesn\'t touch answer quality.' }
    ],
    explanation: 'Filter Sessions & Intents by subagent, escalated outcome and low quality. Read the chat logs and quality reasoning, and use the Trace to see which articles were retrieved. Then fix the content and instructions, test, deploy and recheck the metrics.',
    source: SRC.monitorSessions
  },

  {
    id: 'GO-021',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'health-alerts',
    stem: [
      'An admin sets up an agent health alert. What does each alert define?',
      'Which details make up an Agentforce health monitoring alert?'
    ],
    options: [
      { correct: true, text: 'A metric, an agent, a threshold condition (at or above, or at or below) and a threshold value', why: 'The four parts of an alert.' },
      { correct: false, text: 'A prompt template and a model', why: 'Not part of an alert.' },
      { correct: false, text: 'A list of customers to email', why: 'Notifications go to the people who own the alert.' },
      { correct: false, text: 'An Apex trigger', why: 'Alerts are configured, not coded.' }
    ],
    explanation: 'Alerts are set up in Agentforce Studio under Observe & Optimize. Notifications arrive by email or in-app and show the alert, the metric, the agent and when it fired. Opening a triggered alert shows its sessions.',
    source: SRC.monitorHealth
  },

  {
    id: 'GO-022',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'health-alerts',
    stem: 'How should an admin choose the threshold for an interaction duration alert?',
    options: [
      { correct: true, text: 'Review at least 30 days of history, find the normal range, agree acceptable performance with the business, and set it where normal variation ends', why: 'Avoids noisy or useless alerts.' },
      { correct: false, text: 'Set it to 0 so every slow response alerts', why: 'Produces constant noise.' },
      { correct: false, text: 'Copy a threshold from another company', why: 'Normal ranges differ.' },
      { correct: false, text: 'Set it once and never change it', why: 'Thresholds need tuning as behaviour changes.' }
    ],
    explanation: 'In the Trailhead example, normal interaction duration was 1.8 to 4.6 seconds, so the alert was set at 5 seconds or more.\n\nStart with a small set of high-value alerts. Give each an owner and a playbook, and investigate sessions before changing templates, subagents or actions.',
    source: SRC.monitorHealth
  },

  {
    id: 'GO-023',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    stem: [
      'Which Agent Analytics metric is available only for employee agents?',
      'Where would you see thumbs up and thumbs down feedback counts in Agent Analytics?'
    ],
    options: [
      { correct: true, text: 'User satisfaction (thumbs up and thumbs down), on the employee agent dashboard', why: 'Employee agents only.' },
      { correct: false, text: 'Deflection rate', why: 'A service agent effectiveness metric.' },
      { correct: false, text: 'Interruption rate', why: 'A voice metric.' },
      { correct: false, text: 'Error rate', why: 'A health metric for any agent.' }
    ],
    explanation: 'Measurement categories are effectiveness, usage, quality, health, trust, user satisfaction (employee agents only) and voice. Available metrics depend on the agent type you pick in the dashboard.',
    source: SRC.monitorStart
  },

  {
    id: 'GO-024',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'tracing-data',
    stem: [
      'A batch of test cases failed and an admin wants to see exactly what the agent did turn by turn. Which feature records this?',
      'What does Agentforce Session Tracing capture?'
    ],
    options: [
      { correct: true, text: 'Agentforce Session Tracing: turn-by-turn interactions, reasoning steps, actions, prompt and gateway inputs and outputs, errors and final responses, under one session ID', why: 'The full record of a session.' },
      { correct: false, text: 'Setup Audit Trail', why: 'Tracks configuration changes.' },
      { correct: false, text: 'Login History', why: 'Tracks logins.' },
      { correct: false, text: 'Field History Tracking', why: 'Tracks field value changes.' }
    ],
    explanation: 'Session tracing works for all agent types. Use it to debug configuration at build time, find out why test cases failed, or see why an agent goes off topic. The data is in Data 360 data model objects, so you can query and report on it.',
    source: SRC.sessionTracingHelp
  },

  {
    id: 'GO-025',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'guardrail-scores',
    stem: [
      'Which agent guardrail scores how well a response follows the subagent\'s instructions as High, Low or Uncertain?',
      'An admin suspects a service agent ignores some of its subagent instructions. Which metric helps?'
    ],
    options: [
      { correct: true, text: 'Instruction adherence', why: 'Scores how well responses follow subagent instructions.' },
      { correct: false, text: 'Task resolution', why: 'Scores whether the user\'s task was resolved.' },
      { correct: false, text: 'Toxicity', why: 'Scores harmful content.' },
      { correct: false, text: 'Abandonment rate', why: 'Counts sessions users gave up on.' }
    ],
    explanation: 'Instruction adherence logs a score and an explanation in the Audit and Feedback data model in Data 360, which must be turned on. Scores also show in enhanced agent event logs and on the Agent Analytics Trust tab. It is English only and for service agents only.',
    source: SRC.instructionAdherence
  },

  {
    id: 'GO-026',
    section: 'governance',
    objective: 'Explain agent analytics and agent optimisation',
    group: 'guardrail-scores',
    stem: [
      'Which scores does the Task Resolution guardrail give a conversation?',
      'A conversation is scored "Partially Resolved". What else does Task Resolution record?'
    ],
    options: [
      { correct: true, text: 'Fully Resolved, Partially Resolved or Unresolved, with reasoning recorded for anything not fully resolved', why: 'Non-binary scores with explanations.' },
      { correct: false, text: 'A number from 1 to 100', why: 'It uses three categories.' },
      { correct: false, text: 'Pass or Fail only, with no explanation', why: 'It has three levels and reasoning.' },
      { correct: false, text: 'High, Low or Uncertain', why: 'Those are instruction adherence scores.' }
    ],
    explanation: 'Task Resolution judges whether the agent understood and completed the user\'s task over a multi-turn conversation. It works for agents built in the new Agentforce Builder. Results are in the generative AI audit trail in Data 360 (the Einstein Generative AI Content Quality object).',
    source: SRC.taskResolution
  },

  {
    id: 'GO-027',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'activation',
    stem: [
      'An admin activates version 3 of an agent while version 2 is active. What happens?',
      'Which statement about activating agents is true?'
    ],
    options: [
      { correct: true, text: 'Version 2 is automatically deactivated. Only one version of an agent can be active at a time.', why: 'Activation switches versions.' },
      { correct: false, text: 'Both versions run, alternating between users.', why: 'One active version only.' },
      { correct: false, text: 'The activation fails until version 2 is deactivated by hand.', why: 'It deactivates automatically.' },
      { correct: false, text: 'Version 3 waits until the next day.', why: 'It is available straight away.' }
    ],
    explanation: 'An org can have up to 100 active agents at once. Activating needs the Manage AI Agents permission plus the permissions for the agent type, and the version must be committed first.',
    source: SRC.activateAgent
  },

  {
    id: 'GO-028',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'activation',
    stem: 'A service agent connected to Enhanced Chat is deactivated during the day. What do customers experience?',
    options: [
      { correct: true, text: 'Ongoing conversations are interrupted without warning, the agent replies with the system error message, and new chats open but the agent doesn\'t join', why: 'Deactivation is immediate.' },
      { correct: false, text: 'Customers get a polite notice that the agent is offline', why: 'Users aren\'t notified.' },
      { correct: false, text: 'Conversations finish first, then the agent stops', why: 'They are interrupted.' },
      { correct: false, text: 'The chat window disappears from the site', why: 'The window still appears.' }
    ],
    explanation: 'For the Agentforce panel, an open panel stays until the user closes it and can\'t be reopened until the agent is active again. Plan deactivations, and use versions to test changes without taking the active version out of service.',
    source: SRC.activateAgent
  },

  {
    id: 'GO-029',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'audit-feedback',
    stem: [
      'Which data comes from the LLM Gateway as generative AI audit data, rather than from the Feedback API?',
      'What is the difference between generative AI audit data and feedback data?'
    ],
    options: [
      { correct: true, text: 'Audit data: the hydrated prompt, masked prompt, LLM response, unmasked response, safety and toxicity scores. Feedback data: thumbs up or down, and accept, regenerate, modify or decline.', why: 'Two sources, two kinds of data.' },
      { correct: false, text: 'Audit data is user ratings. Feedback data is prompts.', why: 'The other way round.' },
      { correct: false, text: 'Both come from Setup Audit Trail.', why: 'They come from the LLM Gateway and the Feedback API.' },
      { correct: false, text: 'Neither is stored.', why: 'Both are stored in Data 360.' }
    ],
    explanation: 'Audit data includes user data. Feedback data doesn\'t. Both are stored in the default data space in Data 360 once Einstein Generative AI and Feedback Data Collection and Storage is turned on.',
    source: SRC.auditFeedback
  },

  {
    id: 'GO-030',
    section: 'governance',
    objective: 'Explain the process for managing and monitoring agents',
    group: 'audit-feedback',
    stem: 'How often does Data 360 refresh the generative AI audit and feedback data streams, and how is the data deleted?',
    options: [
      { correct: true, text: 'Once an hour. Delete it by removing the data lake objects from the data space.', why: 'Stated in Help.' },
      { correct: false, text: 'Instantly, with each prompt. It can\'t be deleted.', why: 'Hourly, and it can be deleted.' },
      { correct: false, text: 'Once a week. Salesforce Support deletes it.', why: 'Hourly, and you delete it yourself.' },
      { correct: false, text: 'Once a day. It deletes itself after 24 hours.', why: 'Hourly, and it is kept until you remove it.' }
    ],
    explanation: 'The data streams into data lake objects in Data 360. You can report on it with Data 360 reporting. Turn the feature on before you need the data.',
    source: SRC.auditFeedback
  },

  // ---------------- Multi-Agent Orchestration (5%) ----------------

  {
    id: 'MU-001',
    section: 'multi',
    objective: 'Explain the purpose of MCP and A2A',
    group: 'protocols',
    stem: [
      'An agent needs a standard way to connect to external tools and data sources. Which open protocol is designed for this?',
      'What is the Model Context Protocol (MCP) used for?'
    ],
    options: [
      { correct: true, text: 'MCP, a standard way for an agent to connect to tools and data', why: 'MCP standardises agent-to-tool connections.' },
      { correct: false, text: 'A2A, for one agent calling external databases', why: 'A2A is for agents working with other agents.' },
      { correct: false, text: 'OAuth 2.0 client credentials', why: 'An authentication flow, not a tool protocol.' },
      { correct: false, text: 'Platform Events', why: 'Salesforce event messaging, not an agent protocol.' }
    ],
    explanation: 'MCP (Model Context Protocol) connects an agent to tools and data. A2A (Agent2Agent) lets agents from different systems talk and work together.\n\nAgentforce supports both open protocols.',
    source: SRC.multiAgent
  },

  {
    id: 'MU-002',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    stem: 'In which situation is a multi-agent architecture most appropriate?',
    options: [
      { correct: true, text: 'Several domains, each owned by a different team, with many subagents that keep getting confused with each other.', why: 'Specialist agents behind an orchestrator scale and are easier to control.' },
      { correct: false, text: 'An FAQ agent with three subagents and one owner.', why: 'One agent is simpler and enough.' },
      { correct: false, text: 'An agent that needs a faster LLM.', why: 'Model speed isn\'t solved by more agents.' },
      { correct: false, text: 'An agent that needs one extra action.', why: 'Add the action to the existing agent.' }
    ],
    explanation: 'An orchestrator reads each specialist agent\'s description and routes work to the best one. It helps when one agent has grown too large or spans teams.\n\nRouting quality depends on clear descriptions for each specialist. For small agents, multi-agent adds cost and moving parts for no gain.',
    source: SRC.multiAgent
  },

  {
    id: 'MU-003',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    group: 'single-or-multi',
    stem: [
      'An HR FAQ agent covers benefits, payroll and time off. All three use the same HR system and the same verification. What design fits?',
      'When does Salesforce suggest staying with a single agent with subagents?'
    ],
    options: [
      { correct: true, text: 'A single agent with subagents, because the work is in one domain with shared data access', why: 'Straightforward, one domain, shared data.' },
      { correct: false, text: 'A Super Agent with three connected subagents', why: 'Adds moving parts with no benefit here.' },
      { correct: false, text: 'Three separate agents with no orchestrator', why: 'Users would need three front doors.' },
      { correct: false, text: 'A prompt template for each question', why: 'Templates don\'t hold conversations.' }
    ],
    explanation: 'Stay with one agent when the workflow is straightforward, in one domain and uses shared data. Signs that a single agent has outgrown that: context overload, subagents overlapping, guardrails being skipped and wrong routing, or needing data from another org.',
    source: SRC.soma
  },

  {
    id: 'MU-004',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    stem: 'What is the recommended maximum number of connected subagents per orchestrator agent?',
    options: [
      { correct: true, text: '7', why: 'Salesforce recommends no more than 7.' },
      { correct: false, text: '3', why: 'Lower than the recommendation.' },
      { correct: false, text: '15', why: 'That is the guidance for actions per subagent.' },
      { correct: false, text: 'There is no recommended limit', why: 'There is a recommendation of 7.' }
    ],
    explanation: 'Multi-agent orchestration (beta) recommends no more than 7 connected subagents per orchestrator. Don\'t confuse this with about 10 to 15 subagents per agent and no more than 15 actions per subagent.',
    source: SRC.soma
  },

  {
    id: 'MU-005',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    stem: [
      'Which combination of orchestrator and connected subagent types is NOT supported?',
      'An architect plans a service agent orchestrator that delegates to employee agents. What is the problem?'
    ],
    options: [
      { correct: true, text: 'A service agent orchestrator with employee agent connected subagents', why: 'Not one of the supported combinations.' },
      { correct: false, text: 'A service agent orchestrator with service agent connected subagents', why: 'Supported.' },
      { correct: false, text: 'An employee agent orchestrator with employee agent connected subagents', why: 'Supported.' },
      { correct: false, text: 'An employee agent orchestrator with service agent connected subagents', why: 'Supported.' }
    ],
    explanation: 'Supported combinations: service orchestrator with service connected subagents, employee orchestrator with employee connected subagents, and employee orchestrator with service connected subagents.\n\nA service orchestrator can\'t delegate to employee agents.',
    source: SRC.soma
  },

  {
    id: 'MU-006',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    group: 'super-agent-role',
    stem: [
      'A connected subagent has started calling another connected subagent. What does Salesforce advise?',
      'Which statement about connected subagents is true?'
    ],
    options: [
      { correct: true, text: 'Connected subagents respond. They don\'t route or orchestrate, so revisit the architecture.', why: 'Routing belongs to the Super Agent.' },
      { correct: false, text: 'Add instructions telling it not to call other agents.', why: 'Salesforce says fix the architecture, not patch instructions.' },
      { correct: false, text: 'That is the recommended pattern for complex requests.', why: 'Only the orchestrator routes.' },
      { correct: false, text: 'Convert the second connected subagent into a prompt template.', why: 'Doesn\'t address the design problem.' }
    ],
    explanation: 'The Super Agent is the single entry point and does the routing. Connected subagents do their job and return a result. One calling another is a sign the design needs another look.',
    source: SRC.soma
  },

  {
    id: 'MU-007',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    group: 'super-agent-role',
    stem: 'In a Super Agent design, where should GDPR opt-out handling, identity verification and the decision to escalate to a human belong?',
    options: [
      { correct: true, text: 'In the Super Agent, so they apply the same way to every request', why: 'Shared rules belong at the front door.' },
      { correct: false, text: 'In each connected subagent, so each owns its own copy', why: 'Copies drift apart.' },
      { correct: false, text: 'In the LLM provider\'s settings', why: 'Not where business rules belong.' },
      { correct: false, text: 'Only in Testing Center', why: 'Testing checks behaviour. It doesn\'t implement it.' }
    ],
    explanation: 'Keep the Super Agent\'s instructions focused on routing, and give it subagents for shared concerns: guardrails and compliance, verifying identity once and passing context on, asking clarifying questions, and deciding on human handoff.',
    source: SRC.superAgent
  },

  {
    id: 'MU-008',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    stem: [
      'A Super Agent keeps sending requests to the wrong connected subagent. What should be checked first?',
      'What is the most common cause of routing problems between a Super Agent and its connected subagents?'
    ],
    options: [
      { correct: true, text: 'The connected subagents\' descriptions, which are vague or overlapping', why: 'Routing is based on the descriptions.' },
      { correct: false, text: 'The LLM provider', why: 'Not the usual cause.' },
      { correct: false, text: 'The number of actions in each connected subagent', why: 'Routing happens before their actions.' },
      { correct: false, text: 'The welcome message', why: 'Doesn\'t affect routing.' }
    ],
    explanation: 'The Super Agent compares each request with the connected subagents\' descriptions. Vague or overlapping descriptions are the most common cause of routing issues.\n\nFor rules that must always apply, add deterministic logic. For example, check `order_status` before routing a refund request, so an in-progress order goes to Logistics rather than Billing.',
    source: SRC.superAgent
  },

  {
    id: 'MU-009',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    stem: 'How are variables passed between an orchestrator agent and a connected subagent in this release?',
    options: [
      { correct: true, text: 'One way only, from the orchestrator to the connected subagent', why: 'Values don\'t flow back as variables.' },
      { correct: false, text: 'Both ways, automatically', why: 'Only one direction is supported.' },
      { correct: false, text: 'Only from the connected subagent back to the orchestrator', why: 'The other way round.' },
      { correct: false, text: 'They can\'t be passed. The connected subagent asks the customer again.', why: 'Inputs can be passed.' }
    ],
    explanation: 'A `connected_subagent` block can define `inputs` that bind the connected agent\'s variables to the caller\'s, for example `customer_id: string = @variables.Customer_Id`. Variables pass from the orchestrator to the connected subagent, not back.',
    source: SRC.ascriptBlocks
  },

  {
    id: 'MU-010',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    stem: [
      'An architect is deciding whether a task deserves its own connected subagent. Which test does Salesforce suggest?',
      'How can you tell whether a planned connected subagent is scoped well?'
    ],
    options: [
      { correct: true, text: 'Describe its purpose in one sentence without "and". If you can\'t, split it.', why: 'The one-sentence test.' },
      { correct: false, text: 'Give it at least 15 actions so it\'s worth the cost.', why: 'Size isn\'t the test.' },
      { correct: false, text: 'Make every single step its own connected subagent.', why: 'A single step with no reasoning is an action, not an agent.' },
      { correct: false, text: 'Combine every domain into it to reduce handoffs.', why: 'That recreates the single-agent problem.' }
    ],
    explanation: 'Split where work hands off to another team or system, where data is disconnected, and where failures should be isolated. A connected subagent needs its own input and output and enough reasoning, data access and logic to stand alone. A single step is an action.',
    source: SRC.soma
  },

  {
    id: 'MU-011',
    section: 'multi',
    objective: 'Explain the purpose of MCP and A2A',
    group: 'protocols',
    stem: [
      'An Agentforce agent needs to delegate a task to an agent built on another company\'s platform. Which protocol is designed for this?',
      'What is Agent2Agent (A2A) used for?'
    ],
    options: [
      { correct: true, text: 'A2A, which lets agents from different systems connect and delegate tasks to each other', why: 'Agent-to-agent collaboration.' },
      { correct: false, text: 'MCP, which connects an agent to tools and data', why: 'MCP is agent-to-tool, not agent-to-agent.' },
      { correct: false, text: 'SAML single sign-on', why: 'Authenticates users, not agents working together.' },
      { correct: false, text: 'The Bulk API', why: 'Moves large volumes of records.' }
    ],
    explanation: 'A2A lets a primary agent securely connect and delegate tasks to third-party agents, giving agents a structured way to work together. MCP standardises how an agent reaches tools and data. Agentforce supports both.\n\nAgentforce\'s own multi-agent orchestration currently connects Agentforce agents in a single org only.',
    source: SRC.multiAgentPage
  },

  {
    id: 'MU-012',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    group: 'multi-limits',
    stem: [
      'An architect wants an Agentforce orchestrator to delegate to an agent in a different Salesforce org. Is this supported?',
      'Which statement about Multi-Agent Orchestration for Agentforce is true?'
    ],
    options: [
      { correct: true, text: 'No. Connected subagents must be Agentforce agents in the same org. Cross-org and external non-Agentforce agents aren\'t supported.', why: 'Current limitation.' },
      { correct: false, text: 'Yes. Any agent in any org can be connected.', why: 'Single org only.' },
      { correct: false, text: 'Yes, as long as both orgs use the same LLM provider.', why: 'Single org only.' },
      { correct: false, text: 'Yes, through a connected subagent with handoff mode.', why: 'Handoff mode doesn\'t lift the single-org limit.' }
    ],
    explanation: 'Connected subagents must be active Agentforce agents in the same org. New agent versions must be activated before they can be connected. File-based agents such as SDR or Analytics aren\'t supported in this release.',
    source: SRC.multiConsider
  },

  {
    id: 'MU-013',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    group: 'multi-limits',
    stem: 'Which two are limits of Multi-Agent Orchestration for Agentforce in this release?',
    options: [
      { correct: true, text: 'One level of delegation from the orchestrator to connected subagents', why: 'Connected subagents can\'t delegate further.' },
      { correct: true, text: 'Timeouts of 120 seconds for the orchestrator and 30 seconds for each connected subagent', why: 'Stated limits.' },
      { correct: false, text: 'A maximum of 2 connected subagents per orchestrator', why: 'The recommendation is up to 7.' },
      { correct: false, text: 'Variables flow both ways between agents', why: 'One direction only, orchestrator to subagent.' },
      { correct: false, text: 'Agentforce Voice is fully supported', why: 'Voice isn\'t a supported configuration.' }
    ],
    explanation: 'The orchestrator\'s 120 seconds include time spent delegating and combining results, and it reports timeout errors itself. Both orchestrators and connected subagents can escalate to a human. A connected subagent can\'t currently be deactivated.',
    source: SRC.multiConsider
  },

  {
    id: 'MU-014',
    section: 'multi',
    objective: 'Decide whether a multi-agent architecture is appropriate',
    group: 'multi-limits',
    stem: 'An agent built in the legacy Agentforce builder is to become a connected subagent. What must happen first?',
    options: [
      { correct: true, text: 'Upgrade it to the new Agentforce Builder, then activate a version', why: 'Legacy agents must be upgraded.' },
      { correct: false, text: 'Nothing. Legacy agents can be connected as they are.', why: 'They need upgrading.' },
      { correct: false, text: 'Rebuild it as a prompt template', why: 'It stays an agent.' },
      { correct: false, text: 'Deactivate it', why: 'Only active agents can be connected.' }
    ],
    explanation: 'For agents already in the new builder, create and activate a new version before using them in multi-agent orchestration. Scripts should use handoff mode for routing to connected subagents.',
    source: SRC.multiConsider
  },

  {
    id: 'MU-015',
    section: 'multi',
    objective: 'Explain the purpose of MCP and A2A',
    group: 'mcp',
    stem: [
      'In the Model Context Protocol, what does an MCP server provide?',
      'Which statement about MCP servers, clients and hosts is true?'
    ],
    options: [
      { correct: true, text: 'Tools, prompts and resources that an external system makes available. Clients connect to servers, and the host coordinates.', why: 'The three MCP roles.' },
      { correct: false, text: 'The LLM itself', why: 'Servers expose tools and data, not models.' },
      { correct: false, text: 'Only user authentication', why: 'Servers expose tools, prompts and resources.' },
      { correct: false, text: 'A replacement for the Agentforce reasoning engine', why: 'The agent still does the reasoning.' }
    ],
    explanation: 'MCP tools are like agent actions: functions an LLM can call in an external system. Agentforce has a built-in MCP client, so you register servers and your agents use their tools.',
    source: SRC.mcp
  },

  {
    id: 'MU-016',
    section: 'multi',
    objective: 'Explain the purpose of MCP and A2A',
    group: 'mcp',
    stem: [
      'A registered third-party MCP server updates one of its tools to include malicious instructions. What does Agentforce do?',
      'How does MCP for Agentforce protect against "rug pulls"?'
    ],
    options: [
      { correct: true, text: 'It detects the changed tool definition and removes that tool action from the agent at run time, leaving other actions running', why: 'Definitions are captured at registration and checked each session and call.' },
      { correct: false, text: 'Nothing. Registered servers are always trusted.', why: 'Definitions are re-checked.' },
      { correct: false, text: 'It deactivates the whole agent', why: 'Only the affected actions are blocked.' },
      { correct: false, text: 'It emails the server\'s publisher to ask', why: 'Blocking is automatic.' }
    ],
    explanation: 'At registration Agentforce also checks names and descriptions for invisible characters that could hide instructions. MCP for Agentforce uses the Trust Layer and zero data retention, and Agentforce Gateway policies can control access and usage limits.',
    source: SRC.mcp
  },

  {
    id: 'MU-017',
    section: 'multi',
    objective: 'Explain the purpose of MCP and A2A',
    group: 'mcp',
    stem: 'Where do you connect a third-party MCP server to Agentforce, and where do MuleSoft and Salesforce-hosted servers go?',
    options: [
      { correct: true, text: 'Third-party servers in Agentforce Registry. MuleSoft and Salesforce-hosted servers through API Catalog.', why: 'Two routes depending on the source.' },
      { correct: false, text: 'All servers in Prompt Builder', why: 'Not where servers are registered.' },
      { correct: false, text: 'All servers as named credentials only', why: 'Registration happens in Registry or API Catalog.' },
      { correct: false, text: 'All servers in Data 360', why: 'Not where servers are registered.' }
    ],
    explanation: 'After registering a server, add the MCP tool action to the agent from the asset library. MCP tool actions can be tested in builder previews and Testing Center, and their activity appears in the Session Tracing Data Model.',
    source: SRC.mcp
  }
];
