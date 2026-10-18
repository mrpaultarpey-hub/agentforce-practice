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
  legacyGuide: { title: 'Salesforce: Agentforce Guide to Reasoning, Subagents, Instructions and Actions', url: 'https://www.salesforce.com/agentforce/legacy-guide/' }
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
      { correct: false, text: 'An Agentforce Data Library loaded with yesterday\'s order export', why: 'Gives stale data, not a live lookup.' }
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
    source: SRC.retriever
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
  }
];
