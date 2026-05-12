### Assignment Note: Marketing Mojito Expense Tracker

**What I Built**
I developed a premium, responsive Expense Tracker using React and Vite. The application allows users to log expenses with specific categories, visualize their spending breakdown through dynamic progress bars, and track a running total. I focused on creating a high-end "Marketing Mojito" brand aesthetic, utilizing a dark-themed glassmorphism design with mint and forest green accents.

**API Usage**
For the live currency conversion feature, I integrated the **Frankfurter.app API**. This public API provides reliable, real-time exchange rates. I implemented a robust fetching logic that handles loading states and provides a graceful "Offline Mode" with fallback rates if the API becomes unreachable, ensuring the UI remains functional and informative at all times.

**Challenges and Improvements**
One challenge was ensuring the layout felt consistent across drastically different resolutions (Desktop vs. Mobile). I addressed this by using a flexible CSS Grid and Flexbox system. With more time, I would:
1.  **Add Data Visualization**: Integrate a library like Chart.js for more detailed spending trends over time.
2.  **User Authentication**: Implement a backend or Firebase for multi-user support and cloud sync.
3.  **Search & Filtering**: Add advanced filtering to search through large sets of expenses.
