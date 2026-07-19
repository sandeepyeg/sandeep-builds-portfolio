import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
  signal,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

@Component({
  selector: 'app-dev-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="terminal"
      (click)="focusInput()"
      tabindex="0"
      (keydown)="focusInput()"
      role="button"
      aria-label="Interactive developer shell"
    >
      <!-- Window Title Bar -->
      <div class="terminal__header">
        <div class="terminal__dots">
          <span class="terminal__dot terminal__dot--red"></span>
          <span class="terminal__dot terminal__dot--yellow"></span>
          <span class="terminal__dot terminal__dot--green"></span>
        </div>
        <div class="terminal__title">sandeep@builds: ~ (bash)</div>
        <div class="terminal__actions-placeholder"></div>
      </div>

      <!-- Terminal Body -->
      <div class="terminal__body" #terminalBody>
        <div class="terminal__welcome">
          Welcome to Sandeep's Interactive Lab Shell. Type
          <span class="terminal__highlight">help</span> for a list of available commands.
        </div>

        @for (line of history(); track $index) {
          <div class="terminal__line" [ngClass]="'terminal__line--' + line.type">
            @if (line.type === 'input') {
              <span class="terminal__prompt">sandeep@builds:~$</span>
            }
            <span [innerHTML]="line.text"></span>
          </div>
        }

        <!-- Current Input Line -->
        <div class="terminal__line terminal__line--current">
          <span class="terminal__prompt">sandeep@builds:~$</span>
          <span class="terminal__input-display">{{ currentInputValue() }}</span>
          <span class="terminal__cursor"></span>
          <input
            #hiddenInput
            type="text"
            class="terminal__hidden-input"
            [(ngModel)]="inputValue"
            (ngModelChange)="onInputChange()"
            (keydown.enter)="handleCommand()"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>
      </div>
    </div>
  `,
  styleUrl: './dev-terminal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevTerminal {
  private readonly terminalBody = viewChild<ElementRef<HTMLDivElement>>('terminalBody');
  private readonly hiddenInput = viewChild<ElementRef<HTMLInputElement>>('hiddenInput');

  protected readonly history = signal<TerminalLine[]>([]);
  protected inputValue = '';
  protected currentInputValue = signal('');

  constructor() {
    afterNextRender(() => {
      this.focusInput();
    });
  }

  protected focusInput(): void {
    const inputEl = this.hiddenInput()?.nativeElement;
    if (inputEl) {
      inputEl.focus();
    }
  }

  // Update input text display signal dynamically
  protected onInputChange(): void {
    this.currentInputValue.set(this.inputValue);
  }

  protected handleCommand(): void {
    const cmd = this.inputValue.trim().toLowerCase();
    if (!cmd) {
      this.history.update((h) => [...h, { text: '', type: 'input' }]);
      this.scrollToBottom();
      return;
    }

    this.history.update((h) => [...h, { text: this.inputValue, type: 'input' }]);
    const response = this.execute(cmd);

    if (response) {
      this.history.update((h) => [...h, ...response]);
    }

    this.inputValue = '';
    this.currentInputValue.set('');
    this.scrollToBottom();
  }

  private execute(command: string): TerminalLine[] {
    const args = command.split(' ');
    const mainCmd = args[0];

    switch (mainCmd) {
      case 'help':
        return [
          { text: 'Available commands:', type: 'output' },
          {
            text: '  <span class="terminal__highlight">about</span>       - Brief introduction about Sandeep',
            type: 'output',
          },
          {
            text: '  <span class="terminal__highlight">skills</span>      - List core engineering capabilities',
            type: 'output',
          },
          {
            text: '  <span class="terminal__highlight">projects</span>    - Show selected active repository profiles',
            type: 'output',
          },
          {
            text: '  <span class="terminal__highlight">joke</span>        - Get a random developer joke',
            type: 'output',
          },
          {
            text: '  <span class="terminal__highlight">clear</span>       - Clear the screen history',
            type: 'output',
          },
        ];
      case 'about':
        return [
          {
            text: 'Sandeep Johal — Software Developer II based in Edmonton, Alberta.',
            type: 'output',
          },
          {
            text: 'Focused on building scalable, understandable backends (.NET Core, event-driven message queues, PostGIS spatial data) and modern frontends (Angular, TypeScript).',
            type: 'output',
          },
        ];
      case 'skills':
        return [
          {
            text: '<span class="terminal__highlight">Backend:</span>    .NET 10, ASP.NET Core, EF Core, REST APIs',
            type: 'output',
          },
          {
            text: '<span class="terminal__highlight">Frontend:</span>   Angular 22, TypeScript, RxJS, ECharts, SCSS',
            type: 'output',
          },
          {
            text: '<span class="terminal__highlight">Databases:</span>  PostgreSQL, PostGIS spatial indexing, Redis cache',
            type: 'output',
          },
          {
            text: '<span class="terminal__highlight">Messaging:</span>  RabbitMQ event-driven bus integration',
            type: 'output',
          },
          {
            text: '<span class="terminal__highlight">DevOps:</span>     Docker, Git, GitHub Actions CI/CD pipelines, .NET Aspire',
            type: 'output',
          },
        ];
      case 'projects':
        return [
          {
            text: '📂 <span class="terminal__link">YEG Neighbourhood Lens</span> — Edmonton spatial analysis tool (public)',
            type: 'output',
          },
          {
            text: '📂 <span class="terminal__link">LiteQueue.NET</span> — Redis-backed C# message queue library (public)',
            type: 'output',
          },
          {
            text: '📂 <span class="terminal__link">sandeep-builds-portfolio</span> — Responsive Angular 22 & GSAP website',
            type: 'output',
          },
          {
            text: '📂 <span class="terminal__link">delivercheck-platform</span> — Logistic workflow & driver tracker template',
            type: 'output',
          },
        ];
      case 'joke': {
        const jokes = [
          "Why do programmers wear glasses? Because they don't C#.",
          "There are 10 types of people in the world: those who understand binary, and those who don't.",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
          "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'",
          "['hip', 'hip'] (hip hip array!)",
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return [{ text: randomJoke, type: 'success' }];
      }
      case 'clear':
        setTimeout(() => this.history.set([]), 0);
        return [];
      default:
        return [
          {
            text: `Command not found: <span class="terminal__error-cmd">${command}</span>. Type <span class="terminal__highlight">help</span> to view options.`,
            type: 'error',
          },
        ];
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const bodyEl = this.terminalBody()?.nativeElement;
      if (bodyEl) {
        bodyEl.scrollTop = bodyEl.scrollHeight;
      }
    }, 10);
  }
}
