export interface LabQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string; // "A" | "B" | "C" | "D"
  hint?: string;
}

export interface LabData {
  id: string;
  title: string;
  subtitle: string;
  concepts: string;
  questions: LabQuestion[];
}

export const labsData: LabData[] = [
  {
    id: "lab1",
    title: "Lab 1",
    subtitle: "BIOS & Windows Task Manager",
    concepts: `### Key Concepts

**What is BIOS?**
BIOS (Basic Input/Output System) is firmware stored on the motherboard's ROM chip. It initializes essential hardware components (POST - Power-On Self-Test) when the computer boots and launches the operating system bootloader.

**How to enter BIOS:**
Immediately after powering on the computer, press **F1, F2, F8, F10, F12, Delete, or Escape** before the OS loading screen appears.

**BIOS Sections:**
* **Information:** Lists read-only hardware details like BIOS version, device model, CPU type, and component serial numbers.
* **Main:** Configures primary settings like system time/date, RAM amount, and security details (e.g., administrator passwords).
* **Security:** Configures security features including the Supervisor Password (controls BIOS write access), User Password, HDD Password, and Secure Boot toggles.
* **Boot:** Sets the device boot priority order (e.g., USB, SSD, HDD, PXE Network). Allows switching between modern **UEFI** (Windows 8+) and **Legacy** BIOS (Windows 7 and below).
* **Exit:** Offers options to Save and Exit, Exit Without Saving, or "Load Setup Defaults" (resets settings back to original factory states).

**Task Manager Tabs:**
* **Processes:** Grouped into three distinct categories: **Apps** (user-facing), **Background Processes**, and **Windows Processes** (kernel/system components).
* **Services:** Displays background processes without user interfaces. Status is shown as **Running** or **Stopped**.
* **Performance:** Real-time graphs for system components. Displays active CPU cores/threads/processes count, physical Memory allocation (total, available, in-use), and Ethernet link speed & IP configurations.
* **Resource Monitor:** Launched from the Performance tab, displaying deeper per-process usage statistics for CPU, Memory, Disk, and Network.`,
    questions: [
      {
        id: "q1",
        question: "Which key combinations are typically used to enter BIOS setup?",
        options: [
          "A) F1, F2, F8, F10, F12, Delete, or Escape",
          "B) Alt + F4 or Ctrl + Alt + Delete",
          "C) Windows + L or Alt + Space",
          "D) Shift + Enter or F5"
        ],
        answer: "A",
        hint: "Usually a function key or Delete/Escape pressed immediately after turning on the PC."
      },
      {
        id: "q2",
        question: "What is the difference between UEFI and Legacy boot modes?",
        options: [
          "A) UEFI is required for Windows 8 and above; Legacy is for Windows 7 and older",
          "B) UEFI operates strictly in 16-bit real mode; Legacy operates in 64-bit protected mode",
          "C) Legacy boot modes are faster and support drives larger than 2 TB; UEFI does not",
          "D) UEFI requires a floppy disk drive; Legacy does not"
        ],
        answer: "A",
        hint: "Consider the OS release years (Windows 8 vs older Windows)."
      },
      {
        id: "q3",
        question: "What does the 'Load Setup Defaults' option do in BIOS?",
        options: [
          "A) It resets all BIOS settings back to factory defaults",
          "B) It boots the computer in Windows Safe Mode",
          "C) It formats the primary drive and reinstalls the OS",
          "D) It updates the BIOS firmware from the internet"
        ],
        answer: "A",
        hint: "Think about restoring the motherboard to its baseline configuration."
      },
      {
        id: "q4",
        question: "What is the purpose of the Supervisor Password in BIOS?",
        options: [
          "A) It protects access to BIOS settings; required to change certain options on the Main tab",
          "B) It encrypts files on the secondary storage drive",
          "C) It allows the administrator to override the Windows user login password",
          "D) It limits the CPU speed to prevent overheating"
        ],
        answer: "A",
        hint: "Contrast this with the User password which just controls system booting."
      },
      {
        id: "q5",
        question: "What three categories of processes are shown in Task Manager's Processes tab?",
        options: [
          "A) Apps, Background Processes, Windows Processes",
          "B) Services, Drivers, Startup programs",
          "C) Active, Suspended, Blocked processes",
          "D) Core, Thread, Handle processes"
        ],
        answer: "A",
        hint: "Think about how applications are separated from background and system components."
      },
      {
        id: "q6",
        question: "What happens to Console Window Host (conhost.exe) when you close the Command Prompt window?",
        options: [
          "A) It disappears from the process list because it is a child process of cmd.exe",
          "B) It remains active in the background to handle future terminal requests",
          "C) It automatically restarts as an administrator process",
          "D) It triggers a blue screen of death (BSOD)"
        ],
        answer: "A",
        hint: "conhost.exe is spawned by cmd.exe to handle the console UI."
      },
      {
        id: "q7",
        question: "What information is shown in the Performance tab's Memory section?",
        options: [
          "A) Total physical memory, available physical memory, and memory currently in use",
          "B) Master Boot Record (MBR) size and sector layout",
          "C) Page file size, disk cache throughput, and registry size",
          "D) CPU L1/L2/L3 cache sizes and latency"
        ],
        answer: "A",
        hint: "Displays capacity, remaining, and allocated metrics."
      },
      {
        id: "q8",
        question: "How do you open Resource Monitor from Task Manager?",
        options: [
          "A) Performance tab → click 'Open Resource Monitor'",
          "B) Processes tab → right-click cmd.exe → select 'Monitor'",
          "C) Services tab → double-click RRAS service → click 'Resource'",
          "D) File menu → select 'Run new task' → type 'resmon'"
        ],
        answer: "A",
        hint: "Check the options at the bottom of the Performance tab."
      }
    ]
  },
  {
    id: "lab2",
    title: "Lab 2",
    subtitle: "Processes & Threads (Process Explorer)",
    concepts: `### Key Concepts

**Process:**
A program in execution. It represents the active instance of a running application and owns its isolated virtual memory address space, executable code, and security contexts.

**Thread:**
An independent unit of execution within a process. A single process always has at least one thread and can spawn many threads to run operations in parallel, sharing the parent process's memory space and resources.

**Handle:**
An abstract system-managed token or reference to opened kernel resources (e.g., file descriptors, registry entries, synchronization primitives, or active memory blocks).

**Process Explorer (Sysinternals) Key Features:**
* **Real-time Metrics:** Displays detailed Process ID (PID), current CPU load, physical and virtual memory sizes, page fault counts, handle count, and thread count.
* **Find Window's Process:** Clicking and dragging the crosshair "Find Window's Process" target onto any active GUI window immediately scrolls to and highlights its corresponding process.
* **Process Tree Hierarchy:** Visualizes parent-child relationships clearly (e.g., \`explorer.exe\` → \`cmd.exe\` → \`conhost.exe\`).
* **Kill Process Tree:** Right-clicking and selecting **Kill Process** terminates the target process and recursively forces all of its nested child processes to shut down.
* **VirusTotal Scan:** Connects with the VirusTotal API to scan active process binaries against dozens of anti-malware databases.
* **Process Priority:** Allows adjusting thread priority queues manually (**Low, Below Normal, Normal, Above Normal, High, Real-time**).
* **CPU Affinity:** Binds a process's executing threads exclusively to specific logical CPU cores to isolate performance.

**Key Behavioral Example:**
When the Command Prompt (\`cmd.exe\`) process is terminated, its spawned child console interface (\`conhost.exe\`) is automatically terminated by the operating system.`,
    questions: [
      {
        id: "q9",
        question: "What is the difference between a process and a thread?",
        options: [
          "A) A process is a program in execution with its own memory; a thread is a unit of execution within a process",
          "B) A process is a single line of code; a thread is a collection of compiled libraries",
          "C) A process shares its memory with all other programs; a thread has fully isolated memory",
          "D) A thread is managed by the network adapter; a process is managed by the disk drive"
        ],
        answer: "A",
        hint: "One owns memory resources, while the other runs instructions inside that memory."
      },
      {
        id: "q10",
        question: "What is a handle in the context of operating systems?",
        options: [
          "A) An abstract reference to a memory block or object managed by the OS",
          "B) A physical lever used to lock expansion slots in the motherboard",
          "C) A specific CPU instruction that starts a new process",
          "D) The network address used to connect two remote devices"
        ],
        answer: "A",
        hint: "Think of it as a descriptor or ticket to access a file, registry key, or kernel object."
      },
      {
        id: "q11",
        question: "In Process Explorer, what is the parent process of cmd.exe?",
        options: [
          "A) explorer.exe",
          "B) services.exe",
          "C) lsass.exe",
          "D) conhost.exe"
        ],
        answer: "A",
        hint: "The Windows graphical shell that launches programs when you click them."
      },
      {
        id: "q12",
        question: "What is the child process of cmd.exe in Process Explorer?",
        options: [
          "A) conhost.exe",
          "B) taskmgr.exe",
          "C) svchost.exe",
          "D) explorer.exe"
        ],
        answer: "A",
        hint: "It handles the text window rendering for command-line utilities."
      },
      {
        id: "q13",
        question: "What happens to conhost.exe when cmd.exe is killed in Process Explorer?",
        options: [
          "A) It is also terminated automatically as a child process",
          "B) It continues running under explorer.exe as parent",
          "C) It gets suspended and waits for cmd.exe to restart",
          "D) It turns into a background service"
        ],
        answer: "A",
        hint: "Child processes usually depend on the lifecycle of the parent."
      },
      {
        id: "q14",
        question: "What does the VirusTotal feature in Process Explorer do?",
        options: [
          "A) It checks the selected process against a database of known malware signatures",
          "B) It deletes the process file if it consumes more than 80% CPU",
          "C) It encrypts the process memory to prevent unauthorized reading",
          "D) It downloads updates for the process executable from Microsoft"
        ],
        answer: "A",
        hint: "Uploads file hashes to verify if there are security concerns."
      },
      {
        id: "q15",
        question: "Name three pieces of information you can get about a process from Process Explorer.",
        options: [
          "A) PID, CPU load, memory usage, page faults, handle count, thread count, virtual memory size",
          "B) Processor voltage, motherboard model, and power source",
          "C) IP address, subnet mask, and DNS server configurations",
          "D) Number of physical CPU cores, cache line size, and RAM type"
        ],
        answer: "A",
        hint: "Think about the columns displayed in Process Explorer."
      },
      {
        id: "q16",
        question: "What does changing process affinity do?",
        options: [
          "A) It assigns the process to run only on specific CPU cores",
          "B) It elevates the process to run with administrator rights",
          "C) It changes the priority level of threads in the scheduler",
          "D) It clears the process memory when the system is idle"
        ],
        answer: "A",
        hint: "Pins threads to particular hardware processing units."
      }
    ]
  },
  {
    id: "lab3",
    title: "Lab 3",
    subtitle: "Monitor & Manage System Resources",
    concepts: `### Key Concepts

**Windows Services:**
* **Routing and Remote Access (RRAS):** An integrated network service that allows the local Windows computer to operate as an IP router, NAT firewall, or secure VPN remote access server.
* **Startup Types:**
  * **Automatic:** Service starts immediately during OS boot.
  * **Manual:** Service starts only when explicitly requested by a user or dependent application.
  * **Disabled:** Service cannot be started by the system or users.
* **Dynamic Network Adapters:** In this lab, starting the **Routing and Remote Access** service dynamically provisions a new virtual network adapter inside Windows Network Connections; stopping the service deletes this adapter immediately.

**Performance Monitor (PerfMon):**
* **Data Collector Sets:** Pre-configured monitoring schedules that record specified performance counters automatically over time to files.
* **Counters:** This lab tracks the \`Available MBytes\` memory counter to log free physical RAM.
* **Log Storage:** Data is stored in CSV (Comma Separated Values) format under the default directory \`C:\\PerfLogs\`.
* **Visualizations:** Toggleable between live linear **Line Graphs** and static **Report Views**.

**Event Viewer:**
* Found under **Computer Management → System Tools → Event Viewer → Windows Logs → System**.
* Records timestamps, event source IDs, and descriptions of service lifecycle changes.
* **Key Event Count:** Starting and subsequently stopping the **Routing and Remote Access** service registers **4 event logs** total inside the System viewer.

**Resource Monitor:**
Displays granular per-process performance tabs mapping active CPU, Memory, Disk, and Network traffic, complete with current disk response times.`,
    questions: [
      {
        id: "q17",
        question: "What does the Routing and Remote Access service do?",
        options: [
          "A) It allows the local device to function as a router or remote access server",
          "B) It defragments physical storage drives automatically",
          "C) It configures parental controls for local web browsers",
          "D) It manages sleep and hibernation timers for laptop displays"
        ],
        answer: "A",
        hint: "It has routing and remote login capabilities for networks."
      },
      {
        id: "q18",
        question: "What are the three startup types for a Windows service?",
        options: [
          "A) Automatic, Manual, Disabled",
          "B) Scheduled, Delayed, Priority",
          "C) Core, User, System",
          "D) Live, Backup, Offline"
        ],
        answer: "A",
        hint: "Think of how a service triggers: automatically, on-demand, or never."
      },
      {
        id: "q19",
        question: "What happens in Network Connections when Routing and Remote Access is started?",
        options: [
          "A) A new network adapter appears in the window",
          "B) The Wi-Fi adapter gets disabled automatically",
          "C) All active network traffic is redirected to the printer",
          "D) The Ethernet IP address is reset to 127.0.0.1"
        ],
        answer: "A",
        hint: "It creates a virtual interface to manage VPN or routing connections."
      },
      {
        id: "q20",
        question: "What is a Data Collector Set in Performance Monitor?",
        options: [
          "A) A configured set of performance counters that records data over time to a file",
          "B) A utility that scans the hard drive for duplicate files",
          "C) A group of services required to run virtualization hypervisors",
          "D) A secure boundary that blocks viruses from accessing the registry"
        ],
        answer: "A",
        hint: "It packages metrics to log files for performance baselining."
      },
      {
        id: "q21",
        question: "In which folder are Performance Monitor logs saved by default in this lab?",
        options: [
          "A) C:\\PerfLogs",
          "B) C:\\Windows\\System32\\config",
          "C) C:\\Users\\Public\\Documents",
          "D) C:\\Program Files\\Performance"
        ],
        answer: "A",
        hint: "A folder named 'PerfLogs' located on the system drive."
      },
      {
        id: "q22",
        question: "What counter does the lab use to track memory in Performance Monitor?",
        options: [
          "A) Available MBytes",
          "B) Committed Bytes",
          "C) Cache Faults/sec",
          "D) Page file utilization"
        ],
        answer: "A",
        hint: "Logs available space in megabytes."
      },
      {
        id: "q23",
        question: "How many Event Viewer log entries are created when Routing and Remote Access is started and then stopped?",
        options: [
          "A) Four events",
          "B) Two events",
          "C) Ten events",
          "D) None"
        ],
        answer: "A",
        hint: "Two events are logged during startup, and two during shutdown."
      }
    ]
  },
  {
    id: "lab4",
    title: "Lab 4",
    subtitle: "File Systems",
    concepts: `### Key Concepts

**File System Architectures:**
* **NTFS (New Technology File System):** Default Windows partition system. Supports file-level ACL permissions, disk quotas, integrated encryption (EFS), compression, and handles very large file sizes.
* **FAT32 (File Allocation Table 32):** Legacy cross-platform file system. Restricted to a maximum file size of **4 GB** and maximum volume size of **32 GB**. Lacks security permission controls.
* **exFAT (Extended File Allocation Table):** Optimized filesystem for USB flash storage. Eliminates the 4 GB file boundary while omitting heavy NTFS metadata and journal logs.

**System Utilities:**
* \`fsutil fsinfo volumeinfo C:\` : Queries filesystem parameters (supports object identifiers, case-sensitive names, compression, hard links).
* \`fsutil fsinfo ntfsinfo C:\` : Queries NTFS-specific values (Master File Table - MFT layout, sector/cluster size).
* \`chkdsk C: /f /r\` : Scans volume structures. **\/f** fixes system structure errors; **\/r** locates physical bad sectors and attempts to recover readable text.
* \`convert X: /fs:NTFS\` : Converts a FAT32 partition to NTFS in-place without deleting files. **One-way operation** (cannot downgrade back to FAT32 without formatting).

**Disk Configuration Features:**
* **Disk Management Utility:** System GUI used to initialize, partition, shrink, extend, and format storage drives.
* **Disk Quotas:** Located under Drive Properties → Quota tab. Allows limits on maximum drive space per user account. Windows denies write calls once the quota is reached.
* **LogicalDisk Counters:**
  * \`% Free Space\` : Percentage of unallocated volume space.
  * \`Avg. Disk sec/Read\` / \`Avg. Disk sec/Write\` : Average time (in seconds) to execute an I/O transaction.
  * \`Current Disk Queue Length\` : Active pending I/O requests. High queue counts suggest disk bottlenecks.`,
    questions: [
      {
        id: "q24",
        question: "What command displays file system information for the C: drive?",
        options: [
          "A) fsutil fsinfo volumeinfo C:",
          "B) wmic diskdrive get size",
          "C) chkdsk C: /f",
          "D) powercfg /query"
        ],
        answer: "A",
        hint: "Use fsutil, fsinfo, and volumeinfo targets."
      },
      {
        id: "q25",
        question: "What is the difference between chkdsk /f and chkdsk /r?",
        options: [
          "A) /f fixes file system errors; /r locates bad sectors and recovers readable data",
          "B) /f formats the drive; /r restores deleted folders",
          "C) /f checks NTFS permissions; /r scans the registry for errors",
          "D) /f works on FAT32 only; /r works on NTFS only"
        ],
        answer: "A",
        hint: "One targets software filesystem catalog structures, the other targets physical magnetic drive blocks."
      },
      {
        id: "q26",
        question: "What does the convert command do, and what is its main risk?",
        options: [
          "A) It converts a partition from FAT32 to NTFS; the risk is potential data loss if interrupted",
          "B) It changes dynamic disks to basic disks; the risk is physical disk burnout",
          "C) It converts raw disk sectors to MBR blocks; the risk is motherboard incompatibility",
          "D) It converts compressed files to encrypted files; the risk is losing the decryption key"
        ],
        answer: "A",
        hint: "Changes filesystem architectures without formatting, but power failures during execution are dangerous."
      },
      {
        id: "q27",
        question: "What happens when a user exceeds their disk quota limit?",
        options: [
          "A) Windows denies further write operations to that drive for that user",
          "B) The user's account is automatically logged out",
          "C) The system defragments the drive to free up space",
          "D) A blue screen of death (BSOD) is triggered"
        ],
        answer: "A",
        hint: "No more data can be saved, causing write access errors."
      },
      {
        id: "q28",
        question: "Which LogicalDisk counter is most important for detecting an I/O bottleneck?",
        options: [
          "A) Current Disk Queue Length",
          "B) % Free Space",
          "C) Average Disk Write size",
          "D) Disk Reads/sec"
        ],
        answer: "A",
        hint: "Monitors the queue of pending disk reads and writes."
      },
      {
        id: "q29",
        question: "What is the difference between NTFS and FAT32?",
        options: [
          "A) NTFS supports security permissions, encryption, quotas, and large files; FAT32 has a 4 GB file size limit and no security features",
          "B) FAT32 is modern and fast; NTFS is old and used only for legacy devices",
          "C) NTFS works only on USB drives; FAT32 works only on SSD drives",
          "D) FAT32 supports permissions and compression; NTFS does not"
        ],
        answer: "A",
        hint: "NTFS is modern and secure; FAT32 is simple, old, and highly compatible."
      },
      {
        id: "q30",
        question: "What does fsutil fsinfo ntfsinfo C: show?",
        options: [
          "A) NTFS-specific details: cluster size, total and free clusters, MFT location and size",
          "B) Security logs showing who modified the files on C: drive",
          "C) A list of all hidden files and folders on C: drive",
          "D) Active network connections using C: partition resources"
        ],
        answer: "A",
        hint: "Provides micro-level metrics about clusters and the Master File Table."
      }
    ]
  },
  {
    id: "lab5",
    title: "Lab 5",
    subtitle: "Input/Output Devices & I/O Systems",
    concepts: `### Key Concepts (from Tanenbaum Chapter 5)

**I/O Device Categories:**
* **Block Devices:** Store and retrieve data in fixed-size blocks, independently addressable (e.g., hard disks, SSDs, USB drives).
* **Character Devices:** Stream data character-by-character, non-addressable and non-seekable (e.g., keyboards, mice, serial connection ports, printers).

**Device Management:**
* **Device Manager:** Console displaying active hardware, driver modules, hardware identifiers (HWIDs), and resource registers.
* **Commands:**
  * \`wmic diskdrive get model,interfaceType,size,mediaType\` : Lists storage device parameters.
  * \`powercfg /devicequery wake_armed\` : Queries hardware devices authorized to wake the PC from sleep mode (e.g., USB keyboards, network interface cards).

**I/O Execution Mechanics:**
* **DMA (Direct Memory Access):** Dedicated hardware controller that transfers data directly between high-speed device controllers and RAM without constant CPU polling. This drastically reduces CPU overhead.
* **Interrupts:** Hardware signals sent to the CPU when an I/O device finishes an operation, signaling the CPU to temporarily halt current actions and run an Interrupt Service Routine (ISR).
* **Disk Arm Scheduling Algorithms:**
  * **FCFS (First-Come, First-Served):** Requests are processed in arrival order. Fair but slow.
  * **SSTF (Shortest Seek Time First):** Resolves requests closest to the current position of the disk arm. Reduces seek time but can lead to track starvation.
  * **SCAN (Elevator):** Moves disk arm in one direction to the end, then reverses, servicing requests in path order. Prevents starvation.

**Performance Monitor Counters:**
* \`% Disk Time\` : Percentage of time a physical drive is active.
* \`Disk Reads/sec\` / \`Disk Writes/sec\` : I/O throughput rate.
* \`Current Disk Queue Length\` : Measures I/O bottleneck states.`,
    questions: [
      {
        id: "q31",
        question: "What is the difference between a block device and a character device?",
        options: [
          "A) Block devices (disks) transfer data in fixed-size blocks; character devices (keyboards) transfer data one character at a time",
          "B) Block devices are internal; character devices are always external",
          "C) Character devices are addressable and seekable; block devices are streaming only",
          "D) Block devices are simulated; character devices are physical hardware"
        ],
        answer: "A",
        hint: "Addressable chunks versus raw streams."
      },
      {
        id: "q32",
        question: "What does DMA stand for and what is its purpose?",
        options: [
          "A) Direct Memory Access; it allows devices to transfer data directly to RAM without CPU involvement",
          "B) Dynamic Memory Allocation; it reserves memory pages for threads",
          "C) Distributed Media Adapter; it synchronizes remote display ports",
          "D) Device Management Agent; it automatically installs driver packages"
        ],
        answer: "A",
        hint: "Bypasses the central processor to transfer drive blocks directly into memory."
      },
      {
        id: "q33",
        question: "What is an interrupt in the context of I/O?",
        options: [
          "A) A signal from a hardware device to the CPU indicating that the device needs attention or has completed an operation",
          "B) An error that causes the computer to shut down immediately",
          "C) A network packet that blocks other active connections",
          "D) A thread scheduler state that suspends inactive processes"
        ],
        answer: "A",
        hint: "A hardware alarm that halts CPU execution to trigger a handler."
      },
      {
        id: "q34",
        question: "What command lists devices that can wake the PC from sleep?",
        options: [
          "A) powercfg /devicequery wake_armed",
          "B) powercfg /query wake_devices",
          "C) wmic wake_armed get list",
          "D) fsutil wakeinfo getall"
        ],
        answer: "A",
        hint: "Uses powercfg utility with a devicequery query for wake_armed."
      },
      {
        id: "q35",
        question: "What does the Current Disk Queue Length counter indicate?",
        options: [
          "A) The number of I/O requests waiting to be processed; a high value indicates a disk bottleneck",
          "B) The speed of disk cache buffering in megabytes per second",
          "C) The remaining space in the disk defragmentation queue",
          "D) The number of active files currently opened by user applications"
        ],
        answer: "A",
        hint: "Measures wait times in drive lines. High values indicate storage lag."
      },
      {
        id: "q36",
        question: "What is the SSTF disk scheduling algorithm?",
        options: [
          "A) Shortest Seek Time First — the disk arm services the request closest to its current position",
          "B) Sector Scan Track Finder — the disk services outer cylinders before inner cylinders",
          "C) Single Speed Transfer Format — the disk arm moves at a uniform constant speed",
          "D) System Synchronization Thread File — processes are served in FIFO order"
        ],
        answer: "A",
        hint: "Services the track with the absolute minimum head movement distance next."
      },
      {
        id: "q37",
        question: "How does enabling power saving affect I/O device performance?",
        options: [
          "A) Devices may be turned off automatically, reducing availability and increasing latency when they wake up",
          "B) It increases data transfer rates by overvolting the CPU",
          "C) It disables all security access lists on storage drives",
          "D) It turns block devices into character devices automatically"
        ],
        answer: "A",
        hint: "Saves laptop battery but introduces wake delays for disk spindles and network ports."
      }
    ]
  },
  {
    id: "lab6",
    title: "Lab 6",
    subtitle: "Deadlocks",
    concepts: `### Key Concepts (from Tanenbaum Chapter 6)

**Four Coffman Conditions for Deadlock:**
All four **must** occur simultaneously for a system deadlock to form:
1. **Mutual Exclusion:** Only one process can hold a resource at any given moment.
2. **Hold and Wait:** A process holding a allocated resource is allowed to request and block on other resources.
3. **No Preemption:** Resources cannot be forcibly taken from a holding process.
4. **Circular Wait:** An active chain of processes exists where each process blocks on a resource held by the next.

**Deadlock vs Livelock:**
* **Deadlock:** Running threads freeze completely (0% CPU load). They stay blocked forever in wait states.
* **Livelock:** Running threads actively change states and cycle resources, but make no functional progress (high CPU load).

**Banker's Algorithm (Deadlock Avoidance):**
* Analyzes dynamic requests to ensure the system remains in a **Safe State**.
* **Safe State:** An execution sequence exists that allows all running processes to successfully claim maximum resources and run to completion.
* **Unsafe State:** No such completion path is guaranteed. Deadlock becomes possible.
* **Math Matrix Formula:** \`Need = Maximum - Allocation\`

**Deadlock Prevention Strategies:**
* **Attack Mutual Exclusion:** Virtualize non-sharable resources (e.g., spooling printers). Often impossible.
* **Attack Hold and Wait:** Require processes to request all resources at start, or release current holds before requesting new ones.
* **Attack No Preemption:** Force a process to surrender current resources if a new request cannot be immediately met.
* **Attack Circular Wait:** Force a strict numeric global ordering on all resources. Processes must request resources strictly in ascending order.

**In the Lab:**
Acquiring both locks simultaneously (or releasing holds before waiting) breaks the **Hold and Wait** condition, avoiding deadlocks.`,
    questions: [
      {
        id: "q38",
        question: "What are the four necessary conditions for a deadlock?",
        options: [
          "A) Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
          "B) Mutual Exclusion, Starvation, Race Conditions, Busy Waiting",
          "C) Semaphores, Mutexes, Monitors, Locks",
          "D) FCFS scheduling, CPU Affinity, Virtual Memory, Swapping"
        ],
        answer: "A",
        hint: "Think of Coffman's four requirements: exclusive ownership, holding while waiting, no stealing, and a circular loop."
      },
      {
        id: "q39",
        question: "What is the difference between a deadlock and a livelock?",
        options: [
          "A) In a deadlock processes are completely frozen with 0% CPU; in a livelock processes keep changing state but make no progress",
          "B) In a livelock processes are frozen with 0% CPU; in a deadlock processes make normal progress",
          "C) Deadlock happens in virtual machines; livelock happens on bare-metal systems",
          "D) Deadlock can be solved automatically; livelock requires a hardware restart"
        ],
        answer: "A",
        hint: "One is locked in place, the other is active but running in circles."
      },
      {
        id: "q40",
        question: "In the Banker's Algorithm, what does 'safe state' mean?",
        options: [
          "A) A sequence exists in which every process can obtain the resources it needs and finish execution",
          "B) All processes are currently blocked and secure from virus threats",
          "C) The system has completed defragmentation and backed up all MFT directories",
          "D) CPU core affinity is set to 100% on the primary processing unit"
        ],
        answer: "A",
        hint: "An allocation path exists where no process stays blocked forever."
      },
      {
        id: "q41",
        question: "What is the formula for 'Need' in the Banker's Algorithm?",
        options: [
          "A) Need = Maximum − Allocation",
          "B) Need = Maximum + Allocation",
          "C) Need = Available − Allocation",
          "D) Need = Allocation − Available"
        ],
        answer: "A",
        hint: "It represents what resources remain to be claimed based on maximum limit and current holdings."
      },
      {
        id: "q42",
        question: "Which deadlock condition was broken in the lab prevention exercise?",
        options: [
          "A) Hold and Wait — threads request both locks simultaneously instead of one at a time",
          "B) Mutual Exclusion — locks are virtualized using a spooler background utility",
          "C) No Preemption — the kernel forcibly takes locks from blocking threads",
          "D) Circular Wait — threads are forced to request locks in descending index order"
        ],
        answer: "A",
        hint: "Think about grabbing all locks in a single atomic transaction."
      },
      {
        id: "q43",
        question: "Why does the deadlocked Python program show 0% CPU in Task Manager?",
        options: [
          "A) The threads are blocked waiting for locks; they are not executing any instructions",
          "B) The operating system has terminated the Python execution process",
          "C) The CPU affinity is disabled, causing execution threads to run in parallel",
          "D) The program is suspended in virtual memory to free physical RAM blocks"
        ],
        answer: "A",
        hint: "The OS puts blocked threads to sleep, removing them from active scheduling queues."
      },
      {
        id: "q44",
        question: "Can all four deadlock conditions be broken in practice? Give one that is hardest to break.",
        options: [
          "A) Mutual Exclusion is hardest because some resources (like hardware) genuinely cannot be shared",
          "B) Circular Wait is hardest because global resource index numbering is impossible",
          "C) Hold and Wait is hardest because threads cannot acquire multiple locks",
          "D) No Preemption is hardest because the kernel lacks thread intervention features"
        ],
        answer: "A",
        hint: "Some resources (like physical device writers or critical memory registers) must be kept exclusive."
      }
    ]
  },
  {
    id: "lab7",
    title: "Lab 7",
    subtitle: "Virtualization & Hypervisors",
    concepts: `### Key Concepts (from Tanenbaum Chapter 7)

**Hypervisor Architectures:**
* **Type-1 Hypervisor (Bare-Metal):** Runs directly on the physical host hardware. There is no host operating system. Examples include **Microsoft Hyper-V, VMware ESXi, Xen**. High performance, isolated, ideal for enterprise server systems.
* **Type-2 Hypervisor (Hosted):** Runs as an application on top of an existing host operating system (e.g., Windows/macOS). Examples include **Oracle VirtualBox, VMware Workstation**. Easy to run, higher overhead due to host OS layers.

**Core Virtualization Concepts:**
* **Memory Virtualization:** The hypervisor creates an isolated shadow page table layout for each guest VM. It maps guest virtual address spaces directly to the physical system RAM blocks, ensuring memory isolation.
* **I/O Virtualization:** Presents virtual network cards, storage drives, and controllers to the guest operating system. The hypervisor intercepts guest hardware requests and translates them into physical host hardware calls.
* **Checkpointing (Snapshots):** Atomically writes the entire state of a running VM (including CPU registers, RAM, disk states, and device flags) to a host file. Allows full rollbacks to that exact instant.
* **VM Migration:** Moving a running VM from one physical host hardware chassis to another with minimal user downtime.

**Resource Utilization Calculations:**
* **Formula:** \`Resource Utilization % = (Used Resource / Total Allocated Resource) * 100\`
* *Example:* A guest VM has **4 allocated CPUs**, and applications are actively saturating **2 CPUs**. The CPU utilization is **(2 \/ 4) * 100 = 50%**.

**Platform Execution:**
* **Hyper-V** is enabled on Windows Pro/Enterprise editions using Control Panel → Programs → **Turn Windows features on or off**.
* **VirtualBox** is standard for Windows Home editions where Hyper-V is unavailable.`,
    questions: [
      {
        id: "q45",
        question: "What is the difference between a Type 1 and Type 2 hypervisor?",
        options: [
          "A) Type 1 runs directly on hardware (bare-metal); Type 2 runs on top of a host OS",
          "B) Type 2 runs directly on hardware (bare-metal); Type 1 runs on top of a host OS",
          "C) Type 1 supports only Windows guests; Type 2 supports only Linux guests",
          "D) Type 2 operates in 16-bit real mode; Type 1 operates in 64-bit protected mode"
        ],
        answer: "A",
        hint: "One acts as the OS itself, the other is an application running inside the host."
      },
      {
        id: "q46",
        question: "Give one example of a Type 1 and one example of a Type 2 hypervisor.",
        options: [
          "A) Type 1: Hyper-V or VMware ESXi; Type 2: VirtualBox or VMware Workstation",
          "B) Type 1: VirtualBox; Type 2: VMware ESXi",
          "C) Type 1: Microsoft Word; Type 2: Windows Notepad",
          "D) Type 1: Docker; Type 2: Kubernetes"
        ],
        answer: "A",
        hint: "Hyper-V is native to Windows, VirtualBox is installed as an app."
      },
      {
        id: "q47",
        question: "What is checkpointing in virtualization?",
        options: [
          "A) Saving the complete state of a VM at a specific point in time, allowing rollback to that state",
          "B) Verifying guest OS credentials against the Active Directory server",
          "C) Limiting the network bandwidth of virtual interfaces on a VM host",
          "D) Monitoring CPU and memory page faults inside guest processes"
        ],
        answer: "A",
        hint: "Think of it as creating a system snapshot."
      },
      {
        id: "q48",
        question: "What is VM migration?",
        options: [
          "A) Moving a running or stopped VM from one physical host to another",
          "B) Upgrading the guest operating system to a newer version",
          "C) Converting a Type 2 hypervisor into a Type 1 hypervisor",
          "D) Backing up virtual disks to a local USB partition"
        ],
        answer: "A",
        hint: "Relocating virtual hosts across hardware platforms."
      },
      {
        id: "q49",
        question: "What is a virtual appliance?",
        options: [
          "A) A pre-configured VM image in OVA/OVF format ready to be imported and deployed",
          "B) A simulated hardware component such as a virtual DVD drive",
          "C) A web browser extension that controls virtualization configurations",
          "D) A hardware hypervisor device soldered directly to the motherboard"
        ],
        answer: "A",
        hint: "A bundle containing a pre-installed OS and application package."
      },
      {
        id: "q50",
        question: "What does memory virtualization do?",
        options: [
          "A) It gives each VM its own isolated virtual address space mapped to physical RAM by the hypervisor",
          "B) It expands physical RAM size by creating virtual page files on storage drives",
          "C) It synchronizes cache lines between physical multi-core processors",
          "D) It compresses RAM sectors to prevent memory fragmentation"
        ],
        answer: "A",
        hint: "Keeps virtual machines from accessing or corrupting each other's allocated RAM."
      },
      {
        id: "q51",
        question: "How do you enable Hyper-V on Windows?",
        options: [
          "A) Control Panel → Programs → Turn Windows features on or off → check Hyper-V (requires Windows Pro or Enterprise)",
          "B) Task Manager → Performance tab → click 'Enable Hyper-V'",
          "C) Device Manager → System Devices → Enable virtualization hardware drivers",
          "D) Open Command Prompt → type 'hyperv /enable'"
        ],
        answer: "A",
        hint: "Check under the Windows Features menu."
      },
      {
        id: "q52",
        question: "A VM has 4 CPUs and 2 are in use. What is CPU utilization?",
        options: [
          "A) 50%",
          "B) 25%",
          "C) 100%",
          "D) 80%"
        ],
        answer: "A",
        hint: "Divide active units by total allocated units, then multiply by 100."
      }
    ]
  },
  {
    id: "lab8",
    title: "Lab 8",
    subtitle: "Virtualization Part 2 (Advanced Topics)",
    concepts: `### Key Concepts (from Tanenbaum Chapter 7 & Labs)

**Advanced Virtualization Paradigms:**
* **Resource Overcommitment:** Allocating more virtual resources (vCPUs, RAM) to VMs than physically exist on the host hardware. It relies on the statistical fact that not all VMs saturate resources at the exact same moment.
* **Paravirtualization:** A virtualization technique where the guest operating system is modified before installation. The guest OS is fully aware it is running in a virtual environment and uses specialized APIs (\`hypercalls\`) instead of raw hardware instructions. This drastically speeds up execution compared to full binary translation.
* **Live VM Migration Mechanics:**
  1. **Pre-copy migration:** The hypervisor copies all physical memory pages from the source host to the destination host while the VM is still running. Memory pages modified during the transfer (\`dirty pages\`) are re-copied.
  2. **Post-copy migration:** The VM is suspended briefly on the source host, its registers are copied, and it immediately starts executing on the destination host. If the VM accesses a memory page still on the source, it triggers a page fault over the network to fetch it.
* **Virtualization Fault Tolerance:**
  Demonstrated through continuous checkpointing. If the primary VM fails, the hypervisor restores the secondary VM from the latest transaction log checkpoints immediately.

**Formulas & Calculations:**
* **vCPU to Physical Core Ratio:** \`Ratio = Total allocated vCPUs / Total physical cores\`
* **Memory Ballooning:** A hypervisor driver running inside the guest OS that inflates to reclaim unused memory pages and returns them to the host physical pool.`,
    questions: [
      {
        id: "q_v1",
        question: "Which operation in a real hypervisor corresponds to the migrate() method in the simulation?",
        options: [
          "A) Exporting and importing the virtual machine",
          "B) Taking a snapshot of the virtual disk",
          "C) Configuring memory ballooning drivers",
          "D) Allocating vCPUs to guest operating systems"
        ],
        answer: "A",
        hint: "Think about moving a virtual package to another physical server container."
      },
      {
        id: "q_v2",
        question: "What do the checkpoint() and restore() methods together illustrate in a virtual machine simulation?",
        options: [
          "A) Checkpointing / snapshotting for fault tolerance",
          "B) Memory overcommitment statistics logging",
          "C) Dynamic resource scaling of vCPUs",
          "D) Paravirtualization kernel updates execution"
        ],
        answer: "A",
        hint: "A technique that saves the system state to recover from unexpected hardware failures."
      },
      {
        id: "q_v3",
        question: "Which virtualization technique is most directly demonstrated by exporting a virtual machine and then importing it on another host?",
        options: [
          "A) Paravirtualization",
          "B) Full hardware virtualization",
          "C) Memory ballooning reclamation",
          "D) CPU core affinity binding"
        ],
        answer: "A",
        hint: "A term used in Variant 1 to represent structural portability and host coordination."
      },
      {
        id: "q_v4",
        question: "Calculating resource utilization percentage after stopping applications demonstrates:",
        options: [
          "A) Efficient resource management in virtualization",
          "B) Mutual exclusion conditions prevention",
          "C) Direct memory access (DMA) execution",
          "D) Event Viewer log registry updates"
        ],
        answer: "A",
        hint: "Think about releasing physical resources to the shared pool when VMs go idle."
      },
      {
        id: "q_v5",
        question: "What is a key difference between a Type-1 and a Type-2 hypervisor?",
        options: [
          "A) Type-1 runs directly on hardware, Type-2 runs on top of a host OS",
          "B) Type-2 runs directly on hardware, Type-1 runs on top of a host OS",
          "C) Type-1 supports only one VM, Type-2 supports multiple virtual environments",
          "D) Type-2 supports paravirtualization hypercalls, Type-1 does not"
        ],
        answer: "A",
        hint: "Consider the presence or absence of a host operating system layer."
      },
      {
        id: "q_v6",
        question: "What statements about cache coherence in multiprocessor systems are correct?",
        options: [
          "A) It ensures all processors see the same value for shared data",
          "B) It completely eliminates the need for mutex thread locks",
          "C) It is only needed in single-core UMA systems",
          "D) It cannot be implemented using bus snooping protocols"
        ],
        answer: "A",
        hint: "Ensures consistent memory visibility across multi-core systems."
      },
      {
        id: "q_v7",
        question: "What phenomenon occurs when two processors repeatedly invalidate each other's cache lines because unrelated variables share the same cache line?",
        options: [
          "A) False sharing",
          "B) Cache thrashing",
          "C) Memory fragmentation",
          "D) Thread starvation"
        ],
        answer: "A",
        hint: "A major cache performance degradation issue in shared-memory multiprocessors."
      },
      {
        id: "q_v8",
        question: "What problem does cache coherence solve in shared-memory multiprocessor systems?",
        options: [
          "A) It ensures all processors have a consistent view of shared memory",
          "B) It eliminates mutual exclusion deadlocks",
          "C) It improves read/write disk queue latencies",
          "D) It monitors Windows Security threat history logs"
        ],
        answer: "A",
        hint: "Keeps local processor caches synchronized with global system RAM."
      }
    ]
  },
  {
    id: "lab9",
    title: "Lab 9",
    subtitle: "Security",
    concepts: `### Key Concepts (from Tanenbaum Chapter 9)

**Main Security Goals:**
* **Confidentiality:** Protecting data against unauthorized read access.
* **Integrity:** Protecting data against unauthorized modification or deletion.
* **Availability:** Ensuring legitimate users can access services and data reliably.

**Trusted Computing Base (TCB):**
The minimal subset of system hardware and software components that must be fully trusted. A flaw in the TCB compromises the entire system's security integrity. In Windows, this is enforced by the kernel and the Security Reference Monitor (SRM).

**Access Control Lists (ACLs):**
* NTFS uses ACL structures where each file/directory is linked to specific Access Control Entries (ACEs).
* **icacls Command:** Display and edit folder access permission tables (\`icacls \"C:\\FolderName\"\`).
* **Principle of Least Privilege:** Users and services must be assigned only the absolute minimum permissions required to perform their tasks.

**Cryptography & BitLocker:**
* **Symmetric Cryptography:** Uses the same secret key for both encryption and decryption (e.g., AES). Fast, optimized for storage drives.
* **Asymmetric Cryptography:** Uses a keypair: a public key to encrypt and a separate private key to decrypt (e.g., RSA).
* **BitLocker:** Standard full-volume disk encryption utilizing **AES**. Cryptographic keys are locked using a motherboard hardware chip called the **TPM (Trusted Platform Module)**.

**Malware Classifications:**
* **Virus:** Malicious binary that inserts its own code into legitimate executable files. Requires user activation to spread.
* **Worm:** Self-replicating network program. Automatically copies itself across network ports without requiring user actions.
* **Trojan:** Malicious program disguised as legitimate software.
* **Rootkit:** Complex malware that hides itself and active payloads deep inside kernel memory structures.
* **Ransomware:** Encrypts user volumes and demands payment to release decryption keys.

**OS Protections:**
* \`sfc /scannow\` : System File Checker. Scans and replaces corrupted Windows system files.
* \`DISM /Online /Cleanup-Image /RestoreHealth\` : Repairs underlying system images.
* **UAC (User Account Control):** Forces processes to run in standard user contexts. Prompts for administrator credentials before allowing system-wide modifications.
* **DEP (Data Execution Prevention):** Marks memory regions as non-executable to prevent malicious code from executing inside data pools.
* **ASLR (Address Space Layout Randomization):** Randomizes memory layouts to prevent buffer overflows from targeting static memory addresses.`,
    questions: [
      {
        id: "q53",
        question: "What are the three main goals of security?",
        options: [
          "A) Confidentiality, Integrity, Availability",
          "B) Identification, Authentication, Authorization",
          "C) Encryption, Decryption, Hashing",
          "D) Detection, Prevention, Recovery"
        ],
        answer: "A",
        hint: "Known as the CIA triad of computer security."
      },
      {
        id: "q54",
        question: "What is the Trusted Computing Base (TCB)?",
        options: [
          "A) The minimal hardware and software that must be trusted for the system to be secure",
          "B) The physical database containing Windows logon passwords",
          "C) The safe folder where Windows Security quarantines viruses",
          "D) The network adapter firmware that authenticates SSL keys"
        ],
        answer: "A",
        hint: "The absolute baseline set of software and hardware modules that manage system security."
      },
      {
        id: "q55",
        question: "What is the principle of least privilege?",
        options: [
          "A) Users and processes should be given only the minimum permissions necessary to perform their tasks",
          "B) Guest VMs should be assigned only the minimum CPU cores they need",
          "C) Hard drives should be partitioned using the smallest sector size",
          "D) Command prompt should be executed without administrator rights by default"
        ],
        answer: "A",
        hint: "Prevents account takeover from compromising adjacent databases or programs."
      },
      {
        id: "q56",
        question: "What command displays the ACL of a folder in Windows?",
        options: [
          "A) icacls \"C:\\foldername\"",
          "B) fsutil acl show C:\\foldername",
          "C) wmic acl get C:\\foldername",
          "D) show-acl C:\\foldername"
        ],
        answer: "A",
        hint: "Windows command starting with 'ica' to control access lists."
      },
      {
        id: "q57",
        question: "What is the difference between NTFS permissions and sharing permissions?",
        options: [
          "A) NTFS permissions apply locally and over the network; sharing permissions apply only when accessing via the network",
          "B) Sharing permissions are encrypted; NTFS permissions are in plain text",
          "C) NTFS permissions apply to drives; sharing permissions apply to folders only",
          "D) Sharing permissions require UAC credentials; NTFS permissions do not"
        ],
        answer: "A",
        hint: "Think about physical access to the device versus network access."
      },
      {
        id: "q58",
        question: "Name four types of malware and briefly describe each.",
        options: [
          "A) Virus (attaches to files), Worm (self-replicates across networks), Trojan (disguised as legitimate software), Rootkit (hides deep in the OS)",
          "B) Spyware (logs keystrokes), Ransomware (encrypts files), Adware (shows ads), Bloatware (unwanted pre-installed apps)",
          "C) Keylogger (logs keys), Logic Bomb (triggers on time), Backdoor (opens port), Exploit (uses software bug)",
          "D) Phishing (steals info), Spoofing (fakes identity), DDoS (overwhelms ports), MITM (intercepts traffic)"
        ],
        answer: "A",
        hint: "Think about how viruses, worms, trojans, and rootkits spread or hide."
      },
      {
        id: "q59",
        question: "What does BitLocker use to store encryption keys securely?",
        options: [
          "A) TPM (Trusted Platform Module)",
          "B) NTFS Access Control lists",
          "C) Event Viewer System logs",
          "D) Master Boot Record sectors"
        ],
        answer: "A",
        hint: "A dedicated hardware cryptographic microprocessor soldered to modern motherboards."
      },
      {
        id: "q60",
        question: "What is the difference between symmetric and asymmetric cryptography?",
        options: [
          "A) Symmetric uses the same key for encryption and decryption; asymmetric uses a public key to encrypt and a private key to decrypt",
          "B) Asymmetric uses the same key for encryption and decryption; symmetric uses a public key to encrypt and a private key to decrypt",
          "C) Symmetric is used only in virtual machines; asymmetric works only on web servers",
          "D) Asymmetric is much faster than symmetric cryptography"
        ],
        answer: "A",
        hint: "One shared secret versus a public/private keypair."
      },
      {
        id: "q61",
        question: "What does sfc /scannow do?",
        options: [
          "A) Scans all protected system files and repairs corrupted ones",
          "B) Sweeps the primary storage partition to detect bad sectors",
          "C) Deletes temporary cache directories to speed up execution",
          "D) Checks active network adapters for hardware bottlenecks"
        ],
        answer: "A",
        hint: "System File Checker command."
      },
      {
        id: "q62",
        question: "What is a buffer overflow attack and how does Windows mitigate it?",
        options: [
          "A) Writing data beyond a buffer boundary to overwrite adjacent memory; mitigated by ASLR (Address Space Layout Randomization) and DEP (Data Execution Prevention)",
          "B) Overwhelming the CPU with endless thread instructions; mitigated by Mutex priority queues",
          "C) Flooding the network port with ping packets; mitigated by Routing and Remote Access firewalls",
          "D) Exceeding disk volume storage boundaries; mitigated by NTFS Disk Quotas"
        ],
        answer: "A",
        hint: "Floods local heap structures to redirect CPU instruction pointers, prevented by DEP and ASLR."
      },
      {
        id: "q63",
        question: "What is the role of UAC in Windows security?",
        options: [
          "A) It prompts the user for confirmation before allowing admin-level changes, preventing unauthorized elevation of privileges",
          "B) It automatically encrypts folders using symmetric AES keys",
          "C) It scans downloaded applications against known malware signatures",
          "D) It limits memory allocations to guest virtual machines"
        ],
        answer: "A",
        hint: "Triggers a secure screen prompt before allowing settings modifications or installations."
      },
      {
        id: "q64",
        question: "What is sandboxing?",
        options: [
          "A) Running untrusted code in an isolated environment so it cannot affect the rest of the system",
          "B) Creating multiple partitions on a physical storage drive",
          "C) Simulating hardware device registers in Type-2 hypervisors",
          "D) Restoring the operating system state from Event Viewer checkpoints"
        ],
        answer: "A",
        hint: "Think of enclosing an application inside a secure play area where it cannot write to system folders."
      }
    ]
  }
];
